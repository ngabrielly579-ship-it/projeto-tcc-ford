# Paradox — plataforma literária em Angular

Projeto acadêmico de uma comunidade de leitura e publicação de fanfics. A interface foi criada com identidade própria, inspirada em clubes literários, estantes digitais e portais editoriais.

## O que já está no projeto

- Home editorial com obra da semana e mural de atualizações
- Ranking semanal e clubes de fandom
- Explorar com pesquisa dinâmica e filtros
- Página individual com perfil de autor, ficha da obra e comentários
- Índice de capítulos
- Modo leitura imersivo com ajuste de fonte
- Favoritos com `localStorage`
- Estante pessoal com favoritos e progresso de leitura
- Perfil
- Publicação de história com validação
- Política de privacidade / LGPD
- Estatística de taxa de favoritos
- Layout responsivo

## Estrutura Angular

- `app.component.ts` → layout principal
- `app.routes.ts` → rotas
- `services/paradox.service.ts` → dados e regras de negócio
- `components/fanfic-card.component.ts` → card reutilizável
- `components/rating-stars.component.ts` → avaliação
- `pages/` → telas principais do site

## Como rodar

```bash
npm install
npm start
```

Depois, abra o endereço indicado pelo Angular no terminal (normalmente `http://localhost:4200`).

## Conferência antes da entrega

O projeto foi validado com `npm run build` usando Angular 18. Os dados de favoritos, avaliações, histórico e comentários são demonstrativos e ficam armazenados somente no navegador.
