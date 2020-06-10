const DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://buddy-champ-jj-backend.herokuapp.com/"
    : "http://127.0.0.1:8000/";
console.log("Using domain: " + DOMAIN);
export const GET_CHAMPION_LIST = DOMAIN + "api/get-champions";
export const POST_COMBINATION_RATE = DOMAIN + "api/load-combination-win-rate";
export const GET_GAME_VERSION = DOMAIN + "api/game-version";
