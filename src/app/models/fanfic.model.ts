export interface Fanfic {
  id: number;
  title: string;
  author: string;
  fandom: string;
  genres: string[];
  status: 'Completa' | 'Em andamento';
  rating: number;
  age: 'Livre' | '12+' | '14+' | '16+' | '18+';
  chapters: number;
  views: number;
  favorites: number;
  cover: string;
  synopsis: string;
  updatedAt?: string;
  updateLabel?: string;
  characters?: string[];
  ship?: string;
}

export interface StoryComment {
  id: number;
  storyId: number;
  author: string;
  text: string;
  date: string;
}

export interface ReadingHistory {
  id: number;
  chapter: number;
  date: string;
}

export interface PublishFormData {
  title: string;
  fandom: string;
  genre: string;
  age: string;
  status: string;
  synopsis: string;
}
