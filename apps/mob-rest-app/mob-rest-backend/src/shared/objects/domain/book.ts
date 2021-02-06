import { Author } from './author';

export interface Book {
    author: Author;
    title: string;
    'creation-date'?: string;
}
