import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar">
      <a class="logo" routerLink="/" (click)="menuOpen = false">
        <span class="logo-mark">P</span>
        <span class="logo-word">PARA<b>DOX</b></span>
      </a>
      <button class="menu-toggle" type="button" (click)="menuOpen = !menuOpen" aria-label="Abrir menu">{{ menuOpen ? '×' : '☰' }}</button>
      <nav [class.open]="menuOpen">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Início</a>
        <a routerLink="/explore" routerLinkActive="active">Explorar</a>
        <a routerLink="/" fragment="clubs">Comunidade</a>
        <a routerLink="/library" routerLinkActive="active">Biblioteca</a>
        <a class="write-link" routerLink="/publish">＋ Escrever</a>
      </nav>
      <div class="nav-actions">
        <a class="icon-btn" routerLink="/explore" aria-label="Pesquisar">⌕</a>
        <a class="profile-btn" routerLink="/profile">FF</a>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      <div class="footer-brand"><strong>PARADOX</strong><span>Onde universos conhecidos ganham novos destinos.</span></div>
      <div class="footer-links">
        <a routerLink="/explore">Descobrir</a>
        <a routerLink="/publish">Publicar</a>
        <a routerLink="/privacy">Privacidade & LGPD</a>
      </div>
    </footer>
  `
})
export class AppComponent {
  menuOpen = false;
}
