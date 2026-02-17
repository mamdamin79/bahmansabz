import type { UsersResponse } from "@/app/_types/users.types";
import { API_BASE } from "./api";

const PAGE_SIZE = 20;

export async function getUsers(page = 1): Promise<UsersResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  const url = `${API_BASE}/users?limit=${PAGE_SIZE}&skip=${skip}&select=id,firstName,lastName,email,phone,username,age,gender,image,role,company`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`[Users] API error ${res.status} ${res.statusText}: ${url}`);
      return { users: [], total: 0, skip: 0, limit: 0 };
    }
    return (await res.json()) as UsersResponse;
  } catch (err) {
    console.error("[Users] Failed to fetch users:", err);
    return { users: [], total: 0, skip: 0, limit: 0 };
  }
}

export { PAGE_SIZE as USERS_PAGE_SIZE };
