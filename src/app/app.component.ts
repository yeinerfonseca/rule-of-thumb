import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Card } from 'src/interfaces/card.interface';
import { CardService } from 'src/services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public gridType: FormControl = new FormControl('list');
  public isMobile: boolean = true;

  public get typeOfGrid(): string {
    return this.gridType.value;
  }

  constructor(public cardsService: CardService) {}

  public ngOnInit(): void {
    this.onResize();
  }

  public trackByNameAndVotes(index: number, card: Card): string {
    return card.id;
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.isMobile = window.matchMedia('(max-width: 767px)').matches;
  }
}
