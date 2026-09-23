import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FanficCardComponent } from '../components/fanfic-card.component';
import { Fanfic } from '../models/fanfic.model';
import { ParadoxService } from '../services/paradox.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, FanficCardComponent],
  template: `
    <div class="page-title">
      <div class="eyebrow">descobrir</div>
      <h1>Explorar histórias</h1>
    </div>

    <section class="section">
      <div class="toolbar">
        <input [(ngModel)]="search" (input)="applyFilters()" placeholder="Pesquisar histórias, autores ou fandoms...">
        <select [(ngModel)]="fandom" (change)="applyFilters()">
          <option value="">Todos os fandoms</option>
          <option *ngFor="let item of service.fandoms" [value]="item">{{ item }}</option>
        </select>
        <select [(ngModel)]="genre" (change)="applyFilters()">
          <option value="">Todos os gêneros</option>
          <option *ngFor="let item of service.genres" [value]="item">{{ item }}</option>
        </select>
        <select [(ngModel)]="status" (change)="applyFilters()">
          <option value="">Todos os status</option>
          <option value="Completa">Completa</option>
          <option value="Em andamento">Em andamento</option>
        </select>
        <select [(ngModel)]="age" (change)="applyFilters()">
          <option value="">Classificação</option>
          <option value="Livre">Livre</option>
          <option value="12+">12+</option>
          <option value="14+">14+</option>
          <option value="16+">16+</option>
          <option value="18+">18+</option>
        </select>
      </div>

      <div class="cards" *ngIf="results.length; else emptyState">
        <app-fanfic-card *ngFor="let story of results" [story]="story" [favorite]="service.isFavorite(story.id)" (toggleFavorite)="toggleFavorite($event)"></app-fanfic-card>
      </div>

      <ng-template #emptyState>
        <div class="empty">Nenhuma história encontrada com esses filtros.</div>
      </ng-template>
    </section>
  `
})
export class ExploreComponent implements OnInit {
  search = '';
  fandom = '';
  genre = '';
  status = '';
  age = '';
  results: Fanfic[] = [];

  constructor(public service: ParadoxService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.genre = params.get('genre') ?? '';
      this.fandom = params.get('fandom') ?? '';
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.results = this.service.filterStories(this.search, this.fandom, this.genre, this.status, this.age);
  }

  toggleFavorite(id: number): void {
    this.service.toggleFavorite(id);
    this.applyFilters();
  }
}
