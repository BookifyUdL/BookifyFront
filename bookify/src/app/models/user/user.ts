import { Achievement } from '../achievement/achievements';
import { Book } from '../book/book';
import { Genre } from '../genre/genre';

export class User {
  _id: string;
  firebaseId: string;
  name: string;
  userPicture: string;
  premium: boolean;
  achievements: Achievement[];
  library: Book[];
  read_book: Book[];
  interested_book: Book[];
  genres: Genre[];
  email: string;
}
