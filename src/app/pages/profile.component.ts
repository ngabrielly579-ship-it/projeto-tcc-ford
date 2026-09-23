import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadoxService } from '../services/paradox.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-title">
      <div class="eyebrow">perfil</div>
      <h1>Meu perfil</h1>
    </div>

    <div class="profile-box">
      <aside class="profile-side">
        <div class="avatar">FF</div>
        <h2>&#64;paradoxuser</h2>
        <p class="section-sub">Leitor e autor no Paradox.</p>
        <div class="detail-stat"><small>Histórias lidas</small><b>{{ service.getHistory().length }}</b></div>
        <div class="detail-stat" style="margin-top:10px"><small>Favoritas</small><b>{{ service.getFavoriteStories().length }}</b></div>
        <div class="detail-stat" style="margin-top:10px"><small>Publicadas</small><b>3</b></div>
      </aside>

      <section class="profile-main">
        <h2>Atividade recente</h2>
        <p class="section-sub">Seus últimos passos dentro da plataforma.</p>
        <ng-container *ngIf="service.getContinueReading().length; else noActivity">
          <div class="history-row" *ngFor="let item of service.getContinueReading().slice(0,5)">
            <div>
              <b>Leu {{ item.story.title }}</b>
              <div class="section-sub">Capítulo {{ item.chapter }}</div>
            </div>
            <span>📖</span>
          </div>
        </ng-container>
        <ng-template #noActivity>
          <div class="empty">Nenhuma atividade recente.</div>
        </ng-template>
      </section>
    </div>
  `
})
export class ProfileComponent {
  constructor(public service: ParadoxService) {}
}
