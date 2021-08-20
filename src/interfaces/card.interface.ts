export interface Card {
  id: string;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: Votes;
}

export interface Votes {
  positive: number;
  negative: number;
}

export type GridType = 'grid' | 'list';
export type VoteSymbol = '+' | '-';
