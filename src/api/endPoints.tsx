const DOMAIN =
  process.env.NODE_ENV === "production"
  ? "https://us-central1-buddy-champ-jj.cloudfunctions.net/app/"
  : "http://localhost:5000/buddy-champ-jj/us-central1/app/"
console.log("Using domain: " + DOMAIN);
export const GET_CHAMPION_LIST = DOMAIN + "api/get-champions";
export const POST_COMBINATION_RATE = DOMAIN + "api/load-combination-win-rate";
export const GET_GAME_VERSION = DOMAIN + "api/game-version";
export const GET_GAME_COUNT = DOMAIN + "api/game-count";
export const GET_COMBINATION_RATE_FOR_ALL = DOMAIN + "api/load-all-combination-win-rate";
