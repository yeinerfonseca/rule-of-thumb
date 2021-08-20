import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Card, VoteSymbol } from 'src/interfaces/card.interface';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  protected cardsCollection: AngularFirestoreCollection<Card>;
  public cards$: Observable<Card[]>;

  constructor(private _database: AngularFirestore) {
    this.cardsCollection = _database.collection<Card>('cards');
    this.cards$ = this.cardsCollection.valueChanges({ idField: 'id' });
  }

  /**
   * Method to update a card.
   * @param card the card that will be updated.
   * @param voteSymbol the sign that indicates whether the vote is positive or negative.
   * @returns a promise once the transaction is finalized.
   */
  public updateCard(card: Card, voteSymbol: VoteSymbol): Promise<void> {
    return this._database.doc(`cards/${card.id}`).update({
      lastUpdated: new Date().toISOString(),
      [`votes.${voteSymbol === '+' ? 'positive' : 'negative'}`]:
        firebase.firestore.FieldValue.increment(1),
    });
  }
}
