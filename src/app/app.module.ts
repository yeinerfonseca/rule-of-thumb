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
import { FormatDatePipe } from '../pipes/format-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VotingCardComponent,
    ScrollableDirective,
    FormatDatePipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  exports: [ScrollableDirective, AngularFirestoreModule, FormatDatePipe],
  providers: [CardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
