import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Fanfic } from '../models/fanfic.model';
import { ParadoxService } from '../services/paradox.service';
import { RatingStarsComponent } from '../components/rating-stars.component';
import { FormsModule } from '@angular/forms';
import { StoryComment } from '../models/fanfic.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, RatingStarsComponent, FormsModule],
  template: `
    <section class="detail" *ngIf="story">
      <div class="detail-hero">
        <div class="cover-column">
          <div class="detail-cover" [style.background-image]="'url(' + story.cover + ')' "></div>
          <div class="story-social"><span>♥ {{ story.favorites.toLocaleString('pt-BR') }}</span><span>◉ {{ story.views.toLocaleString('pt-BR') }}</span></div>
        </div>
        <div class="story-intro">
          <div class="eyebrow">{{ story.fandom }}</div>
          <h1>{{ story.title }}</h1>
          <div class="author">por {{ story.author }}</div>
          <div class="chips">
            <span class="chip" *ngFor="let genre of story.genres">{{ genre }}</span>
            <span class="chip">{{ story.status }}</span>
            <span class="chip">{{ story.age }}</span>
          </div>

          <p class="synopsis">{{ story.synopsis }}</p>

          <div class="detail-actions">
            <a class="primary" [routerLink]="['/story', story.id, 'read', 1]">Ler primeiro capítulo</a>
            <button class="secondary" (click)="toggleFavorite()">{{ service.isFavorite(story.id) ? '♥ Favoritado' : '♡ Favoritar' }}</button>
          </div>

          <app-rating-stars [selected]="myRating" (rated)="saveRating($event)"></app-rating-stars>
        </div>
      </div>

      <div class="story-body-grid">
        <div>
          <div class="chapter-list">
            <div class="section-head">
              <div><div class="eyebrow">índice</div><h2>Capítulos</h2></div>
              <span class="section-sub">{{ story.chapters }} publicados</span>
            </div>
            <a class="chapter" *ngFor="let chapter of chapterNumbers" [routerLink]="['/story', story.id, 'read', chapter]">
              <span class="chapter-number">{{ chapter.toString().padStart(2, '0') }}</span>
              <div><b>{{ service.getChapterTitle(chapter) }}</b><small>Publicado · {{ 8 + (chapter - 1) * 3 }} min</small></div>
              <i>→</i>
            </a>
          </div>

          <section class="comments">
            <div class="section-head"><div><div class="eyebrow">comunidade</div><h2>Entre leitores</h2></div><span>{{ comments.length }} comentários</span></div>
            <form class="comment-form" (ngSubmit)="postComment()">
              <div class="comment-avatar">FF</div>
              <input name="comment" [(ngModel)]="newComment" placeholder="Deixe uma teoria, reação ou incentivo..." maxlength="240">
              <button class="primary" type="submit">Publicar</button>
            </form>
            <article class="comment" *ngFor="let comment of comments">
              <div class="comment-avatar">{{ comment.author.slice(1, 3).toUpperCase() }}</div>
              <div><b>{{ comment.author }}</b><small>{{ comment.date }}</small><p>{{ comment.text }}</p><button type="button">♡ apoiar</button></div>
            </article>
          </section>
        </div>

        <aside class="story-aside">
          <div class="author-card">
            <div class="author-avatar">{{ story.author.slice(1, 3).toUpperCase() }}</div>
            <div class="eyebrow">sobre quem escreve</div>
            <h3>{{ story.author }}</h3>
            <p>Transformando universos conhecidos em histórias que ainda não foram contadas.</p>
            <div class="author-numbers"><span><b>{{ service.getAuthorStories(story.author).length }}</b> obras</span><span><b>1,8k</b> leitores</span></div>
            <button class="secondary">Acompanhar autor</button>
          </div>

          <div class="story-facts">
            <h3>Ficha da obra</h3>
            <p><span>Personagens</span><b>{{ story.characters?.join(', ') }}</b></p>
            <p><span>Relacionamento</span><b>{{ story.ship }}</b></p>
            <p><span>Avaliação</span><b>★ {{ story.rating }}</b></p>
            <p><span>Engajamento</span><b>{{ service.getFavoriteRate(story) }}%</b></p>
          </div>
        </aside>
      </div>
    </section>
  `
})
export class StoryDetailComponent implements OnInit {
  story?: Fanfic;
  myRating = 0;
  chapterNumbers: number[] = [];
  comments: StoryComment[] = [];
  newComment = '';

  constructor(private route: ActivatedRoute, public service: ParadoxService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.story = this.service.getStory(id);
      this.myRating = this.service.getRating(id);
      if (this.story) {
        const visibleChapters = Math.min(this.story.chapters, 8);
        this.chapterNumbers = Array.from({ length: visibleChapters }, (_, index) => index + 1);
        this.comments = this.service.getComments(this.story.id);
      }
    });
  }

  toggleFavorite(): void {
    if (!this.story) return;
    this.service.toggleFavorite(this.story.id);
  }

  saveRating(value: number): void {
    if (!this.story) return;
    this.myRating = value;
    this.service.saveRating(this.story.id, value);
  }

  postComment(): void {
    if (!this.story || !this.newComment.trim()) return;
    this.service.addComment(this.story.id, this.newComment.trim());
    this.newComment = '';
    this.comments = this.service.getComments(this.story.id);
  }
}
