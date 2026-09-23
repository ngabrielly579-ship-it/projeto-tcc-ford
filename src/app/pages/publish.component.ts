import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParadoxService } from '../services/paradox.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page-title">
      <div class="eyebrow">ateliê de escrita</div>
      <h1>Abra um novo universo</h1>
      <p class="section-sub">Monte a identidade da sua obra. Você poderá adicionar capítulos depois da publicação.</p>
    </div>

    <form class="form" [formGroup]="form" (ngSubmit)="submit()">
      <div class="publish-steps"><span class="active"><b>1</b> Identidade</span><i></i><span><b>2</b> Conteúdo</span><i></i><span><b>3</b> Revisão</span></div>
      <h2>Informações principais</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>Título *</label>
          <input formControlName="title" placeholder="Nome da sua história">
        </div>

        <div class="form-group">
          <label>Fandom *</label>
          <select formControlName="fandom">
            <option value="">Selecionar fandom</option>
            <option *ngFor="let item of service.fandoms" [value]="item">{{ item }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Gênero *</label>
          <select formControlName="genre">
            <option value="">Selecionar gênero</option>
            <option *ngFor="let item of service.genres" [value]="item">{{ item }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Classificação *</label>
          <select formControlName="age">
            <option value="">Selecionar</option>
            <option>Livre</option>
            <option>12+</option>
            <option>14+</option>
            <option>16+</option>
            <option>18+</option>
          </select>
        </div>

        <div class="form-group">
          <label>Status *</label>
          <select formControlName="status">
            <option>Em andamento</option>
            <option>Completa</option>
          </select>
        </div>

        <div class="form-group">
          <label>Capa</label>
          <input type="file" accept="image/*">
        </div>
      </div>

      <div class="form-group">
        <label>Sinopse *</label>
        <textarea formControlName="synopsis" placeholder="Conte um pouco sobre sua história..."></textarea>
      </div>

      <div class="section-sub" *ngIf="submitted && form.invalid" style="color:#ff9cbc; margin-bottom:16px;">
        Preencha todos os campos obrigatórios antes de publicar.
      </div>

      <button class="primary" type="submit">Publicar história</button>
    </form>
  `
})
export class PublishComponent {
  submitted = false;

  form = this.fb.group({
    title: ['', Validators.required],
    fandom: ['', Validators.required],
    genre: ['', Validators.required],
    age: ['', Validators.required],
    status: ['Em andamento', Validators.required],
    synopsis: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, public service: ParadoxService, private router: Router) {}

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.service.publishStory(this.form.getRawValue() as { title: string; fandom: string; genre: string; age: string; status: string; synopsis: string; });
    this.form.reset({ status: 'Em andamento' });
    this.router.navigate(['/explore']);
  }
}
