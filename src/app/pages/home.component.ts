import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FanficCardComponent } from '../components/fanfic-card.component';
import { ParadoxService } from '../services/paradox.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FanficCardComponent],
  template: `
    <section class="editorial-hero">
      <div class="hero-copy">
        <div class="eyebrow">arquivo de histórias impossíveis</div>
        <h1>Todo universo<br>tem um <em>e se?</em></h1>
        <p>Leia novas versões dos mundos que você ama, acompanhe autores independentes e guarde cada descoberta na sua própria estante.</p>
        <div class="hero-actions">
          <a class="primary" routerLink="/explore">Descobrir minha próxima história</a>
          <a class="text-action" routerLink="/publish">Começar a escrever <span>↗</span></a>
        </div>
        <div class="reader-note">
          <span class="avatars"><i>LV</i><i>AK</i><i>NS</i></span>
          <span><b>8,4 mil leitores</b> atravessaram o portal esta semana</span>
        </div>
      </div>

      <a class="featured-book" [routerLink]="['/story', spotlight.id]">
        <div class="book-glow"></div>
        <div class="book-cover" [style.background-image]="'url(' + spotlight.cover + ')'">
          <span class="editor-choice">escolha da edição</span>
          <div class="book-title">
            <small>{{ spotlight.fandom }}</small>
            <h2>{{ spotlight.title }}</h2>
            <p>por {{ spotlight.author }}</p>
          </div>
        </div>
        <div class="book-caption">
          <span>Nova temporada</span>
          <b>Capítulo {{ spotlight.chapters }} disponível</b>
          <i>12 min de leitura →</i>
        </div>
      </a>
    </section>

    <section class="reading-strip" *ngIf="continueReading as item">
      <div class="reading-label"><span>▰</span> Sua leitura atual</div>
      <div class="reading-info">
        <b>{{ item.story.title }}</b>
        <span>Capítulo {{ item.chapter }} de {{ item.story.chapters }}</span>
      </div>
      <div class="progress"><i [style.width.%]="item.chapter / item.story.chapters * 100"></i></div>
      <a [routerLink]="['/story', item.story.id, 'read', item.chapter]">Continuar lendo →</a>
    </section>

    <section class="section discovery-section">
      <div class="section-head editorial-head">
        <div>
          <div class="eyebrow">seleção dos leitores</div>
          <h2>Histórias para atravessar a madrugada</h2>
        </div>
        <a class="link" routerLink="/explore">Abrir arquivo completo →</a>
      </div>
      <div class="story-shelf">
        <app-fanfic-card *ngFor="let story of featuredStories" [story]="story" [favorite]="service.isFavorite(story.id)" (toggleFavorite)="toggleFavorite($event)"></app-fanfic-card>
      </div>
    </section>

    <section class="section update-layout">
      <div class="update-feed">
        <div class="section-head">
          <div>
            <div class="eyebrow">agora no paradox</div>
            <h2>O mural está vivo</h2>
          </div>
        </div>
        <a class="feed-entry" *ngFor="let story of recentStories; let i = index" [routerLink]="['/story', story.id]">
          <span class="feed-time">{{ times[i] }}</span>
          <div class="feed-line"><i></i></div>
          <div class="feed-copy">
            <small>{{ i === 0 ? 'NOVO CAPÍTULO' : i === 1 ? 'AUTOR EM DESTAQUE' : 'HISTÓRIA ATUALIZADA' }}</small>
            <h3>{{ story.title }}</h3>
            <p>{{ i === 1 ? story.author + ' entrou para a seleção editorial.' : 'Capítulo ' + story.chapters + ' — ' + service.getChapterTitle(story.chapters) }}</p>
          </div>
        </a>
      </div>

      <aside class="weekly-ranking">
        <div class="ranking-title"><span>Ranking semanal</span><small>mais devoradas</small></div>
        <a *ngFor="let story of topStories; let i = index" [routerLink]="['/story', story.id]" class="weekly-item">
          <strong>{{ (i + 1).toString().padStart(2, '0') }}</strong>
          <div><b>{{ story.title }}</b><span>{{ story.fandom }} · {{ formatViews(story.views) }} leituras</span></div>
          <i>{{ i === 0 ? '↑ 2' : i === 1 ? '—' : '↑ 1' }}</i>
        </a>
      </aside>
    </section>

    <section class="community" id="clubs">
      <div class="community-copy">
        <div class="eyebrow">clubes de fandom</div>
        <h2>Você não lê sozinho.</h2>
        <p>Entre em salas temáticas, acompanhe desafios criativos e converse sobre teorias sem sair da sua próxima leitura.</p>
        <a class="secondary" routerLink="/explore">Encontrar meu fandom</a>
      </div>
      <div class="club-grid">
        <a *ngFor="let club of clubs" [routerLink]="['/explore']" [queryParams]="{ fandom: club.name }" class="club-card">
          <span>{{ club.icon }}</span><div><b>{{ club.name }}</b><small>{{ club.members }} membros</small></div><i>→</i>
        </a>
      </div>
    </section>
  `
})
export class HomeComponent {
  featuredStories = this.service.getFeaturedStories();
  topStories = this.service.getTopStories().slice(0, 4);
  recentStories = this.service.getRecentStories();
  spotlight = this.service.getStory(2)!;
  times = ['há 18 min', 'há 1 hora', 'há 3 horas', 'ontem'];
  clubs = [
    { name: 'Harry Potter', members: '12,8 mil', icon: '⚡' },
    { name: 'Naruto', members: '9,4 mil', icon: '🍥' },
    { name: 'Marvel', members: '8,1 mil', icon: '✦' },
    { name: 'Stranger Things', members: '5,7 mil', icon: '◉' }
  ];

  constructor(public service: ParadoxService) {}

  get continueReading() {
    return this.service.getContinueReading()[0] ?? { story: this.spotlight, chapter: 4 };
  }

  toggleFavorite(id: number): void {
    this.service.toggleFavorite(id);
    this.featuredStories = this.service.getFeaturedStories();
  }

  formatViews(views: number): string {
    return `${(views / 1000).toFixed(1)} mil`;
  }
}
