import type { UserDetail, UsersResponse } from "@/app/_types/users.types";
import { API_BASE } from "./api";

const PAGE_SIZE = 20;

export type UsersSortBy = "firstName" | "age";
export type UsersSortOrder = "asc" | "desc";

export type UsersFilter = { key: string; value: string };

export async function getUsers(
  page = 1,
  q?: string | null,
  sortBy?: UsersSortBy | null,
  order?: UsersSortOrder | null,
  filter?: UsersFilter | null
): Promise<UsersResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  const params = new URLSearchParams();
  params.set("limit", String(PAGE_SIZE));
  params.set("skip", String(skip));
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);

  let endpoint: string;
  if (filter?.key && filter?.value) {
    endpoint = `${API_BASE}/users/filter`;
    params.set("key", filter.key);
    params.set("value", filter.value);
  } else if (q?.trim()) {
    endpoint = `${API_BASE}/users/search`;
    params.set("q", q.trim());
  } else {
    endpoint = `${API_BASE}/users`;
  }

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

export async function getUserById(id: string | number): Promise<UserDetail | null> {
  const url = `${API_BASE}/users/${id}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as UserDetail;
  } catch (err) {
    console.error("[Users] Failed to fetch user:", err);
    return null;
  }
}

export { PAGE_SIZE as USERS_PAGE_SIZE };
