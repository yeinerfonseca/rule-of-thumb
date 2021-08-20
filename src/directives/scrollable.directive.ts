import { Directive, ElementRef, HostListener } from '@angular/core';

interface ScrollEvent extends MouseEvent {
  targetTouches: MouseEvent[];
}

@Directive({
  selector: '[scrollable]',
})

// Using the drag scroll logic from here: https://codepen.io/toddwebdev/pen/yExKoj?editors=0011
export class ScrollableDirective {
  private _scrollSpeed = 1;
  private _isDown = false;
  private _slider: HTMLElement;
  private _startX: number = 0;
  private _scrollLeft: number = 0;

  constructor(private _elRef: ElementRef) {
    this._slider = this._elRef.nativeElement;
  }

  @HostListener('touchstart', ['$event'])
  protected startTouch(e: ScrollEvent) {
    this._isDown = true;
    const pageX: number =
      e.pageX || (e.targetTouches && e.targetTouches[0].pageX);
    this._startX = pageX - this._slider.offsetLeft;
    this._scrollLeft = this._slider.scrollLeft;
  }

  @HostListener('touchend', ['$event'])
  protected endTouch(e: ScrollEvent) {
    this._isDown = false;
  }

  @HostListener('touchmove', ['$event'])
  protected moveTouch(e: ScrollEvent) {
    if (!this._isDown) {
      return;
    }
    if (e.cancelable) e.preventDefault();
    const pageX: number =
      e.pageX || (e.targetTouches && e.targetTouches[0].pageX);
    const x: number = pageX - this._slider.offsetLeft;
    const walk: number = (x - this._startX) * this._scrollSpeed;
    this._slider.scrollLeft = this._scrollLeft - walk;
  }
}
