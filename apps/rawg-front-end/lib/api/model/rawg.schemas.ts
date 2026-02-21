export type Game = {
  id?: number;
  name?: string;
  released?: string | null;
  background_image?: string | null;
};

export type GamesListResponse = {
  count?: number;
  results?: Game[];
};
