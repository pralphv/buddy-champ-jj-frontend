export interface WinRateInterface {
  buddyChamp: string;
  champ: string
  winRate: number;
  total: number;
}
export interface AllWinRateInterface {
  top: string | null;
  jg: string | null;
  mid: string | null;
  ad: string | null;
  sup: string | null;
  winRate: number;
  total: number;
}
