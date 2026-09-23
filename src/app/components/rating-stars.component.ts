import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rating-box">
      <span>{{ label }}</span>
      <button type="button" *ngFor="let value of stars" [class.on]="value <= selected" (click)="select(value)">★</button>
    </div>
  `
})
export class RatingStarsComponent {
  @Input() selected = 0;
  @Input() label = 'Sua avaliação:';
  @Output() rated = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  select(value: number): void {
    this.rated.emit(value);
  }
}
