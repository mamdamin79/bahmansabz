'use server';
import { cookies, headers } from "next/headers";
import { JWT, UserResponse, UserSession } from "../_types/auth.types";
import { jwtDecode } from "jwt-decode";



interface SignInModel {
    username: string;
    password: string;
}

export async function loginAction(model: SignInModel) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username: model.username, password: model.password , expiresInMins:5 }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            const user = await response.json();
            await SetAuthCookieAction(user);
            return { isSuccess: true, response: user };
        } else {
            const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
            return { isSuccess: false, error: errorData.message || `Request failed with status ${response.status}` };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { isSuccess: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function SetAuthCookieAction(user: UserResponse) {
        const decodedAccessToken = jwtDecode<JWT>(user.accessToken);
        const decodedRefreshToken = jwtDecode<JWT>(user.refreshToken);


    const session: UserSession = {
        username: decodedAccessToken.username,
        firstName: decodedAccessToken.firstName,
        image: decodedAccessToken.image,
        lastName:decodedAccessToken.lastName,
        email: decodedAccessToken.email,
        gender: decodedAccessToken.gender,
        exp: decodedAccessToken.exp ,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        refreshTokenExpiry: decodedRefreshToken.exp 
    };

    const cookieStore = await cookies();
    cookieStore.set('bahmansabz-session', JSON.stringify(session), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
    });

}
