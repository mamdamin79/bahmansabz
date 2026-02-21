# RAWG Front-end

Next.js app with Tailwind, TypeScript, and Orval-generated RAWG API client.

## API (Orval)

1. **OpenAPI spec**: Download the RAWG OpenAPI spec from [RAWG API docs](https://api.rawg.io/docs/) or use the placeholder `openapi.json` in this app.
2. **Save**: Put the spec at `./openapi.json` (or update `orval.config.ts` to point to your file).
3. **Generate**: From the repo root run `yarn generate-api`, or from this app run `yarn generate-api`. This regenerates types, fetchers, and React Query hooks (tag-split under `lib/api/`).
4. **Use**:
   - **SSR / SSG / ISR**: In a Server Component, call the generated fetcher (e.g. `const { data } = await gamesList({ page: 1, page_size: 10 });`) and render `data`. Control caching with route segment config: `export const revalidate = 60` (ISR), `export const dynamic = 'force-dynamic'` (SSR), or `export const dynamic = 'force-static'` (SSG).
   - **Client**: Use the generated hooks (e.g. `useGamesList`) in Client Components.

### Env

Copy `.env.example` to `.env.local` and set `RAWG_API_KEY` (or `NEXT_PUBLIC_RAWG_API_KEY` if you need the key in the browser).

### Examples

- **SSR/ISR**: [/games](/games) — Server Component calling `gamesList()`.
- **Client**: [/games/client](/games/client) — Client Component using `useGamesList()`.
