import { Injectable } from '@angular/core';
import { Fanfic, PublishFormData, ReadingHistory, StoryComment } from '../models/fanfic.model';

@Injectable({ providedIn: 'root' })
export class ParadoxService {
  private stories: Fanfic[] = [
    {id:1,title:'Entre Dois Mundos',author:'@luna.v',fandom:'Harry Potter',genres:['Romance','Drama'],status:'Em andamento',rating:4.9,age:'14+',chapters:18,views:18400,favorites:2300,cover:'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80',synopsis:'Quando uma estudante de Hogwarts encontra um diário que pertence a uma linha do tempo impossível, cada escolha começa a reescrever o destino de quem ela ama.', characters:['Hermione', 'Draco', 'Harry'], ship:'Dramione'},
    {id:2,title:'Última Luz de Konoha',author:'@akira.write',fandom:'Naruto',genres:['Aventura','Drama'],status:'Completa',rating:4.8,age:'12+',chapters:27,views:32100,favorites:4100,cover:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',synopsis:'Anos depois da guerra, uma ameaça esquecida retorna e força a nova geração a enfrentar segredos que Konoha preferia manter enterrados.', characters:['Boruto', 'Sarada', 'Naruto'], ship:'Original'},
    {id:3,title:'After Midnight',author:'@starlit',fandom:'Marvel',genres:['Romance','Suspense'],status:'Em andamento',rating:4.7,age:'16+',chapters:12,views:14600,favorites:1800,cover:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80',synopsis:'Nova York muda depois da meia-noite. Para Maya, descobrir quem está por trás de uma sequência de desaparecimentos significa se aproximar de um herói que deveria evitar.', characters:['Maya', 'Peter Parker'], ship:'Peter x OC'},
    {id:4,title:'Cidade Sem Amanhã',author:'@noirfox',fandom:'DC',genres:['Terror','Suspense'],status:'Completa',rating:4.6,age:'16+',chapters:20,views:21200,favorites:2500,cover:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80',synopsis:'Gotham acorda sem memória da noite anterior. Só uma pessoa se lembra — e o que ela viu pode destruir a cidade antes do amanhecer.', characters:['Bruce Wayne', 'Selina Kyle'], ship:'BatCat'},
    {id:5,title:'Neon Hearts',author:'@violetsky',fandom:'BTS',genres:['Romance','Comédia'],status:'Em andamento',rating:4.8,age:'14+',chapters:15,views:27800,favorites:5200,cover:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80',synopsis:'Uma amizade improvável nasce nos bastidores de uma turnê e transforma dias comuns em memórias que parecem grandes demais para caber em uma música.', characters:['Jungkook', 'OC'], ship:'JK x OC'},
    {id:6,title:'O Mundo Invertido',author:'@hawkins86',fandom:'Stranger Things',genres:['Terror','Aventura'],status:'Completa',rating:4.9,age:'14+',chapters:22,views:35600,favorites:6200,cover:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80',synopsis:'Hawkins parecia finalmente em paz, até que sinais estranhos começam a aparecer em rádios desligados e uma nova passagem se abre onde ninguém esperava.', characters:['Eleven', 'Mike', 'Will'], ship:'Mileven'},
    {id:7,title:'Constelações Partidas',author:'@miya',fandom:'Original',genres:['Fantasia','Drama'],status:'Em andamento',rating:4.5,age:'12+',chapters:9,views:7800,favorites:890,cover:'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=80',synopsis:'Num reino onde estrelas caem como chuva, uma cartógrafa descobre que o céu está morrendo — e talvez sua família saiba o motivo.', characters:['Lia', 'Aren'], ship:'Lia x Aren'},
    {id:8,title:'Red Signal',author:'@north',fandom:'Marvel',genres:['Aventura','Suspense'],status:'Em andamento',rating:4.4,age:'14+',chapters:11,views:9100,favorites:1040,cover:'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?auto=format&fit=crop&w=700&q=80',synopsis:'Uma frequência desconhecida invade os sistemas dos Vingadores e antecipa desastres minutos antes de acontecerem. O problema: cada aviso cobra um preço.', characters:['Natasha', 'Tony Stark'], ship:'Gen'}
  ];

  readonly genres = ['Romance','Drama','Aventura','Fantasia','Terror','Comédia','Suspense','Angst'];
  readonly fandoms = ['Harry Potter','Naruto','Marvel','DC','BTS','Stranger Things','Original'];
  readonly chapterTitles = ['O começo','A mensagem','Ecos no escuro','Entre linhas','O segredo','Ponto de ruptura','Depois da meia-noite','Paradoxo'];

  getStories(): Fanfic[] {
    return this.stories;
  }

  getAuthorStories(author: string): Fanfic[] {
    return this.stories.filter(story => story.author === author);
  }

  getFeaturedStories(): Fanfic[] {
    return this.stories.slice(0, 4);
  }

  getTopStories(): Fanfic[] {
    return [...this.stories].sort((a, b) => b.views - a.views).slice(0, 6);
  }

  getRecentStories(): Fanfic[] {
    return this.stories.slice(2, 6);
  }

  getStory(id: number): Fanfic | undefined {
    return this.stories.find(story => story.id === id);
  }

  filterStories(search = '', fandom = '', genre = '', status = '', age = ''): Fanfic[] {
    const term = search.toLowerCase();
    return this.stories.filter(story => {
      const haystack = [story.title, story.author, story.fandom, ...story.genres].join(' ').toLowerCase();
      return (!term || haystack.includes(term))
        && (!fandom || story.fandom === fandom)
        && (!genre || story.genres.includes(genre))
        && (!status || story.status === status)
        && (!age || story.age === age);
    });
  }

  getFavoriteIds(): number[] {
    return JSON.parse(localStorage.getItem('paradox-favs') || '[]');
  }

  isFavorite(id: number): boolean {
    return this.getFavoriteIds().includes(id);
  }

  toggleFavorite(id: number): void {
    const ids = new Set(this.getFavoriteIds());
    ids.has(id) ? ids.delete(id) : ids.add(id);
    localStorage.setItem('paradox-favs', JSON.stringify([...ids]));
  }

  getFavoriteStories(): Fanfic[] {
    const ids = new Set(this.getFavoriteIds());
    return this.stories.filter(story => ids.has(story.id));
  }

  saveRating(id: number, rating: number): void {
    localStorage.setItem(`paradox-rating-${id}`, String(rating));
  }

  getRating(id: number): number {
    return Number(localStorage.getItem(`paradox-rating-${id}`) || 0);
  }

  addHistory(id: number, chapter: number): void {
    const history = this.getHistory().filter(item => item.id !== id);
    history.unshift({ id, chapter, date: new Date().toISOString() });
    localStorage.setItem('paradox-history', JSON.stringify(history.slice(0, 10)));
  }

  getHistory(): ReadingHistory[] {
    return JSON.parse(localStorage.getItem('paradox-history') || '[]');
  }

  getContinueReading(): { story: Fanfic; chapter: number }[] {
    return this.getHistory()
      .map(item => {
        const story = this.getStory(item.id);
        return story ? { story, chapter: item.chapter } : null;
      })
      .filter((item): item is { story: Fanfic; chapter: number } => item !== null);
  }

  getComments(storyId: number): StoryComment[] {
    const stored = JSON.parse(localStorage.getItem(`paradox-comments-${storyId}`) || '[]') as StoryComment[];
    if (stored.length) return stored;
    return [
      { id: 1, storyId, author: '@luaentrelinhas', text: 'A ambientação desse capítulo ficou incrível. Já estou criando teorias para o próximo!', date: 'há 2 horas' },
      { id: 2, storyId, author: '@noxreader', text: 'O final mudou completamente o que eu achava sobre a personagem principal.', date: 'há 47 min' }
    ];
  }

  addComment(storyId: number, text: string): void {
    const comments = this.getComments(storyId);
    comments.unshift({ id: Date.now(), storyId, author: '@paradoxuser', text, date: 'agora' });
    localStorage.setItem(`paradox-comments-${storyId}`, JSON.stringify(comments));
  }

  getFavoriteRate(story: Fanfic): number {
    return Number(((story.favorites / story.views) * 100).toFixed(1));
  }

  getChapterTitle(chapter: number): string {
    return this.chapterTitles[(chapter - 1) % this.chapterTitles.length];
  }

  getChapterText(): string[] {
    return [
      'A chuva riscava a janela como se tentasse escrever alguma coisa do lado de fora. Quando a última luz do corredor apagou, o silêncio tomou conta do lugar — um silêncio pesado, quase vivo.',
      'Ela abriu o caderno outra vez. As páginas estavam vazias pela manhã, mas agora havia uma frase no centro do papel: “Você já esteve aqui antes.”',
      'Por alguns segundos, tudo pareceu parar. O relógio continuava marcando meia-noite, embora tivesse passado pelo menos um minuto desde a última vez que ela olhara.',
      'Então veio a segunda frase. As letras surgiram devagar, uma após a outra, como se alguém invisível estivesse escrevendo do outro lado da realidade.',
      '“Não confie na versão de você que lembrar de amanhã.”',
      'Foi nesse instante que ela percebeu: aquela não era apenas uma história. Era um aviso. E talvez já fosse tarde demais para fingir que nunca tinha lido.'
    ];
  }

  publishStory(data: PublishFormData): void {
    const newStory: Fanfic = {
      id: this.stories.length + 1,
      title: data.title,
      author: '@novo.autor',
      fandom: data.fandom,
      genres: [data.genre],
      status: data.status as 'Completa' | 'Em andamento',
      rating: 5,
      age: data.age as 'Livre' | '12+' | '14+' | '16+' | '18+',
      chapters: 1,
      views: 0,
      favorites: 0,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
      synopsis: data.synopsis,
      characters: ['Personagem principal'],
      ship: 'A definir'
    };

    this.stories = [newStory, ...this.stories];
  }
}
