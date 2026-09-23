import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Fanfic } from '../models/fanfic.model';

@Component({
  selector: 'app-fanfic-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="card" [routerLink]="['/story', story.id]">
      <div class="cover" [style.background-image]="'url(' + story.cover + ')'">
        <button class="favorite" [class.active]="favorite" (click)="onToggle($event)">
          {{ favorite ? '♥' : '♡' }}
        </button>
      </div>
      <div class="card-body">
        <h3>{{ story.title }}</h3>
        <div class="meta">{{ story.author }} · {{ story.fandom }}</div>
        <div class="chips">
          <span class="chip" *ngFor="let genre of story.genres">{{ genre }}</span>
        </div>
        <div class="card-bottom">
          <span>★ {{ story.rating }}</span>
          <span>{{ story.chapters }} capítulos</span>
          <span>👁 {{ formatViews(story.views) }}</span>
        </div>
      </div>
    </article>
  `
})
export class FanficCardComponent {
  @Input({ required: true }) story!: Fanfic;
  @Input() favorite = false;
  @Output() toggleFavorite = new EventEmitter<number>();

  onToggle(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.toggleFavorite.emit(this.story.id);
  }

  formatViews(views: number): string {
    return `${(views / 1000).toFixed(1)}k`;
  }
}
