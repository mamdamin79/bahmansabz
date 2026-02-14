import { cookies } from "next/headers";
import { decryptSession } from "@/app/utils/session";

const getProfileData = async () => {
  const cookieStore = await cookies();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";
  const session = cookieStore.get("bahmansabz-session")?.value;
  if (!session) {
    return { error: "No session found" };
  }
  const decodedSession = await decryptSession(session);
  console.log(decodedSession);
  const response = await fetch(`${apiUrl}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${decodedSession.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    return response.json();
  }
  return { error: "Failed to fetch profile data" };
};

export default async function ProfilePage() {
  const profileData = await getProfileData();
  if (profileData.error) {
    return <div>{profileData.error}</div>;
  }

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <aside
        style={{ width: "30%", border: "1px solid black", padding: "10px" }}
      >
        <h1>Profile</h1>
        <p>
          Name: {profileData.firstName} {profileData.lastName}
        </p>
        <p>Email: {profileData.email}</p>
        <p>Username: {profileData.username}</p>
      </aside>
      <main
        style={{ width: "70%", border: "1px solid black", padding: "10px" }}
      >
        <p>
          Name: {profileData.firstName} {profileData.lastName}
        </p>
      </main>
    </div>
  );
}
