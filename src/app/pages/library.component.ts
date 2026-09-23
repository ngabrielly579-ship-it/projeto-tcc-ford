import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FanficCardComponent } from '../components/fanfic-card.component';
import { Fanfic } from '../models/fanfic.model';
import { ParadoxService } from '../services/paradox.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FanficCardComponent],
  template: `
    <div class="library-hero">
      <div><div class="eyebrow">sua coleção particular</div><h1>Minha estante</h1><p>Histórias guardadas, caminhos pela metade e mundos que você pretende revisitar.</p></div>
      <div class="library-count"><b>{{ favorites.length }}</b><span>obras salvas</span></div>
    </div>

    <section class="section">
      <div class="section-head">
        <div>
          <h2>Na sua estante</h2>
          <div class="section-sub">Sua coleção fica salva neste navegador.</div>
        </div>
      </div>

      <div class="story-shelf library-shelf" *ngIf="favorites.length; else noFavorites">
        <app-fanfic-card *ngFor="let story of favorites" [story]="story" [favorite]="true" (toggleFavorite)="toggleFavorite($event)"></app-fanfic-card>
      </div>
      <ng-template #noFavorites>
        <div class="empty"><span>◇</span><h3>Sua estante ainda está vazia</h3><p>Explore o arquivo e salve histórias para encontrá-las aqui.</p><a class="primary" routerLink="/explore">Descobrir histórias</a></div>
      </ng-template>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <h2>Continuar lendo</h2>
          <div class="section-sub">Seu histórico recente de leitura.</div>
        </div>
      </div>

      <div class="history-grid" *ngIf="history.length; else noHistory">
        <a class="history-row" *ngFor="let item of history" [routerLink]="['/story', item.story.id, 'read', item.chapter]">
          <div class="history-cover" [style.background-image]="'url(' + item.story.cover + ')' "></div>
          <div class="history-copy"><small>{{ item.story.fandom }}</small><b>{{ item.story.title }}</b><span>Capítulo {{ item.chapter }} de {{ item.story.chapters }}</span><div class="progress"><i [style.width.%]="item.chapter / item.story.chapters * 100"></i></div></div>
          <span class="history-arrow">→</span>
        </a>
      </div>
      <ng-template #noHistory>
        <div class="empty">Seu histórico de leitura aparecerá aqui.</div>
      </ng-template>
    </section>
  `
})
export class LibraryComponent implements OnInit {
  favorites: Fanfic[] = [];
  history: { story: Fanfic; chapter: number }[] = [];

  constructor(private service: ParadoxService) {}

  ngOnInit(): void {
    this.refresh();
  }

  toggleFavorite(id: number): void {
    this.service.toggleFavorite(id);
    this.refresh();
  }

  private refresh(): void {
    this.favorites = this.service.getFavoriteStories();
    this.history = this.service.getContinueReading();
  }
}
