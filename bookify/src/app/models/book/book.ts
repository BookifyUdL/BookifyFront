import { Author } from '../author/author';
import { Genre } from '../genre/genre';
import { Shop } from '../shop/shop';

export class Book {
  _id: string;
  title: string;
  author: Author;
  summary: string;
  cover_image: string;
  genre: Genre;
  publication_date: Date;
  num_pages: number;
  provider: Shop;
}
