import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-title">
      <div class="eyebrow">lgpd</div>
      <h1>Política de Privacidade</h1>
    </div>

    <section class="detail">
      <div class="synopsis">
        <p>O Paradox é um protótipo acadêmico. Ele evita a coleta de dados pessoais desnecessários e não solicita CPF, endereço residencial ou dados bancários.</p>
        <p>Favoritos, avaliações simples e histórico de leitura são armazenados localmente no navegador usando <strong>localStorage</strong>. Esses dados existem apenas para demonstrar funcionalidades do projeto e podem ser apagados limpando os dados do site no navegador.</p>
        <p>O projeto utiliza dados fictícios e tem finalidade educacional, seguindo princípios de minimização, transparência e necessidade.</p>
      </div>
    </section>
  `
})
export class PrivacyComponent {}
