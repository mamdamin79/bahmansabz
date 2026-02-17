import type { UsersResponse } from "@/app/_types/users.types";
import { API_BASE } from "./api";

const PAGE_SIZE = 20;

export async function getUsers(
  page = 1,
  q?: string | null,
): Promise<UsersResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  const params = new URLSearchParams();
  params.set("limit", String(PAGE_SIZE));
  params.set("skip", String(skip));
  if (q?.trim()) params.set("q", q.trim());

  const endpoint = q?.trim()
    ? `${API_BASE}/users/search`
    : `${API_BASE}/users`;

  const url = `${endpoint}?${params.toString()}`;
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
