import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Card, GridType, VoteSymbol } from '../../interfaces/card.interface';
import { CardService } from '../../services/card.service';
import { environment } from '../../environments/environment';
import { UserVoteStorage } from 'src/interfaces/storage.interface';

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingCardComponent implements OnChanges, OnInit {
  @Input() public card: Card;
  @Input() public type: GridType | string = 'list';
  @Input() public isMobile: boolean = true;
  public positivePercentage: string;
  public negativePercentage: string;
  public selectedVote: VoteSymbol;
  public hasVoted: boolean = false;

  constructor(private cardsService: CardService) {}

  public ngOnInit(): void {
    const cachedData: UserVoteStorage[] = this.getStore();
    if (cachedData.length) {
      const data: UserVoteStorage = cachedData.find(
        (data) => data.id === this.card.id
      );
      if (data) {
        this.hasVoted = true;
        this.selectedVote = data.type;
      }
    }
  }

  public ngOnChanges(): void {
    this.positivePercentage = this.getPercentage('+');
    this.negativePercentage = this.getPercentage('-');
  }

  /**
   * Method to publish a vote.
   */
  public vote(): void {
    // If hasVoted is TRUE, it means that the user already voted.
    if (this.hasVoted) {
      this.selectedVote = null;
      this.hasVoted = false;
      this.removeCardFromStore();
    } else {
      this.hasVoted = true;
      this.cardsService.updateCard(this.card, this.selectedVote);
      this.storeCards([
        ...this.getStore(),
        {
          id: this.card.id,
          type: this.selectedVote,
        },
      ]);
    }
  }

  /**
   * Method to apply the value of the background-image.
   * @param picture the card's picture.
   * @returns a valid CSS value with either a gradient and the image, or only the image, based on the type of the grid.
   */
  public applyBackground(picture: string): string {
    const backgroundUrlStyle: string = `url('/assets/img/${picture}')`;
    if (this.type === 'list' && !this.isMobile) {
      return `radial-gradient(circle, rgba(138,138,138,1) 70%, rgba(255,255,255,0.2) 89%), ${backgroundUrlStyle}`;
    }
    return backgroundUrlStyle;
  }

  /**
   * Method to get the percentage of votes on the card.
   * @param voteSign the sign of the vote, either positives or negatives.
   * @returns the percentage of votes on the current card.
   */
  private getPercentage(voteSymbol: VoteSymbol): string {
    const { positive, negative } = this.card.votes;
    const totalVotes: number = positive + negative;
    const percentage: number =
      ((voteSymbol === '+' ? positive : negative) * 100) / totalVotes;
    return `${percentage.toFixed(1)}%`;
  }

  /**
   * Method to retrieve the votes from the local storage.
   * @returns a list of user votes (if any)
   */
  private getStore(): UserVoteStorage[] {
    const store: string = localStorage.getItem(environment.storageKey);
    return store ? JSON.parse(store) : [];
  }

  /**
   * Method to store votes in the local storage.
   * @param storage the list of votes we want to store.
   */
  private storeCards(storage: UserVoteStorage[] = []): void {
    localStorage.setItem(environment.storageKey, JSON.stringify(storage));
  }

  /**
   * Method to remove an existing card from the local storage.
   */
  private removeCardFromStore(): void {
    const storage: UserVoteStorage[] = this.getStore();
    if (storage.length) {
      const cardIndex: number = storage.findIndex(
        (data) => data.id === this.card.id
      );
      if (cardIndex > -1) {
        storage.splice(cardIndex, 1);
        this.storeCards(storage);
      }
    }
  }
}
