import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Fanfic } from '../models/fanfic.model';
import { ParadoxService } from '../services/paradox.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="reading-room" *ngIf="story">
      <div class="reader-utility">
        <a [routerLink]="['/story', story.id]">← Voltar à obra</a>
        <div class="reading-controls">
          <span>Texto</span>
          <button (click)="fontSize='1rem'">A−</button>
          <button (click)="fontSize='1.15rem'">A</button>
          <button (click)="fontSize='1.3rem'">A+</button>
        </div>
      </div>
      <div class="reader">
        <div class="reader-top">
          <div class="eyebrow">{{ story.title }} · {{ story.fandom }}</div>
          <span class="chapter-kicker">capítulo {{ chapter.toString().padStart(2, '0') }}</span>
          <h1>{{ service.getChapterTitle(chapter) }}</h1>
          <div class="chapter-ornament"><i></i><span>✦</span><i></i></div>
        </div>

        <article [style.font-size]="fontSize">
          <p *ngFor="let paragraph of paragraphs; let first = first" [class.drop-cap]="first">{{ paragraph }}</p>
        </article>

        <div class="end-mark"><span>fim do capítulo</span><i>◆</i></div>
        <div class="reader-nav">
          <a class="secondary" [class.disabled]="chapter <= 1" [routerLink]="chapter <= 1 ? ['/story', story.id, 'read', 1] : ['/story', story.id, 'read', chapter - 1]">← Capítulo anterior</a>
          <a class="primary" *ngIf="chapter < story.chapters; else finished" [routerLink]="['/story', story.id, 'read', chapter + 1]">Próximo capítulo →</a>
          <ng-template #finished><a class="primary" [routerLink]="['/story', story.id]">Voltar para a obra</a></ng-template>
        </div>
      </div>
    </div>
  `
})
export class ReaderComponent implements OnInit {
  story?: Fanfic;
  chapter = 1;
  fontSize = '1.15rem';
  paragraphs: string[] = [];

  constructor(private route: ActivatedRoute, public service: ParadoxService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.chapter = Number(params.get('chapter')) || 1;
      this.story = this.service.getStory(id);
      this.paragraphs = this.service.getChapterText();
      if (this.story) {
        this.service.addHistory(this.story.id, this.chapter);
      }
    });
  }
}
