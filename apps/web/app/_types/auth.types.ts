export interface UserResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;      
}


export interface JWT {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    image: string;
    exp: number;
}

export interface UserSession extends JWT {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiry: number;
}