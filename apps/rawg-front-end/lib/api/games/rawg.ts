import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { customFetch } from "../custom-fetch";
import type { GamesListResponse } from "../model/rawg.schemas";

export type GamesListParams = {
  page?: number;
  page_size?: number;
};

export type GamesListQueryKey = [string, GamesListParams];

function getGamesListUrl(params?: GamesListParams): string {
  const search = new URLSearchParams();
  if (params?.page != null) search.set("page", String(params.page));
  if (params?.page_size != null)
    search.set("page_size", String(params.page_size));
  const q = search.toString();
  return `/games${q ? `?${q}` : ""}`;
}

export const getGamesListQueryKey = (
  params?: GamesListParams,
): GamesListQueryKey => ["/games", params ?? {}];

export const gamesList = (
  params?: GamesListParams,
  signal?: AbortSignal,
): Promise<{ data: GamesListResponse; status: number; headers: Headers }> => {
  const url = getGamesListUrl(params);
  return customFetch<GamesListResponse>(url, { method: "GET", signal });
};

export const useGamesList = <
  TData = GamesListResponse,
  TError = Error,
>(
  params?: GamesListParams,
  options?: Omit<
    UseQueryOptions<GamesListResponse, TError, TData, GamesListQueryKey>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<TData, TError> => {
  const queryKey = getGamesListQueryKey(params);
  return useQuery({
    queryKey,
    queryFn: ({ signal }) =>
      gamesList(params, signal).then((res) => res.data),
    ...options,
  });
};
