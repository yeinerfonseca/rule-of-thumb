import { VoteSymbol } from './card.interface';

export interface UserVoteStorage {
  id: string;
  type: VoteSymbol;
}
