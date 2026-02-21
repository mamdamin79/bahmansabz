const BASE_URL = "https://api.rawg.io/api";

type CustomFetchConfig = {
  url: string;
  method: string;
  params?: Record<string, unknown>;
  signal?: AbortSignal;
  data?: unknown;
};

function buildUrl(path: string, params?: Record<string, unknown>): string {
  const key =
    process.env.NEXT_PUBLIC_RAWG_API_KEY ?? process.env.RAWG_API_KEY ?? "";
  const parsed = new URL(
    path.startsWith("http") ? path : `${BASE_URL}${path}`,
  );
  if (key) {
    parsed.searchParams.set("key", key);
  }
  if (params && typeof params === "object") {
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      if (Array.isArray(v)) {
        v.forEach((item) => parsed.searchParams.append(k, String(item)));
      } else {
        parsed.searchParams.set(k, String(v));
      }
    }
  }
  return parsed.toString();
}

async function getBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

export const customFetch = async <T>(
  config: CustomFetchConfig,
  _options?: unknown,
): Promise<{ data: T; status: number; headers: Headers }> => {
  const { url, method, params, signal, data } = config;
  const requestUrl = buildUrl(url, params as Record<string, unknown> | undefined);

  const init: RequestInit = {
    method,
    signal,
  };
  if (data !== undefined && method !== "GET") {
    init.body = JSON.stringify(data);
    (init as RequestInit & { headers?: HeadersInit }).headers = {
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(requestUrl, init);
  const responseData = (await getBody(response)) as T;
  return {
    data: responseData,
    status: response.status,
    headers: response.headers,
  };
};
