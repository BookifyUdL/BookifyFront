import { Author } from '../author/author';
import { Genre } from '../genre/genre';
import { Shop } from '../shop/shop';

export class Book {
  _id: string;
  title: string;
  author: Author;
  summary: string;
  picture: string;
  genre: Genre;
  year: number;
  extension: number;
  provider: Shop;
}
