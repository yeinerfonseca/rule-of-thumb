import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { VotingCardComponent } from './voting-card/voting-card.component';
import { ScrollableDirective } from '../directives/scrollable.directive';
import { AppComponent } from './app.component';
import { CardService } from '../services/card.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, VotingCardComponent, ScrollableDirective],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  exports: [ScrollableDirective, AngularFirestoreModule],
  providers: [CardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
