/** Number of games per page on the list. Must match server and pagination. */
export const GAMES_PAGE_SIZE = 12;

/** Number of items to fetch for filter dropdowns (publishers, creators, genres, platforms). */
export const FILTER_LIST_PAGE_SIZE = 100;

/** Metacritic score range (API and UI). */
export const METACRITIC_MIN = 1;
export const METACRITIC_MAX = 100;

/** Max platform badges to show on a game card. */
export const GAME_CARD_MAX_PLATFORMS = 4;

/** Pagination: show all pages when total is at or below this. */
export const PAGINATION_FULL_THRESHOLD = 7;
/** Pagination: show ellipsis when current page is more than this from start/end. */
export const PAGINATION_ELLIPSIS_MARGIN = 2;

/** Games list route (for filter/sort navigation). */
export const GAMES_PATH = "/games";

/** Release date filter: picker disabled before this date. */
export const RELEASE_DATE_MIN = "1900-01-01";
