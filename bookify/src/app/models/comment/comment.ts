import { User } from '../user/user';

export class Comment {
  _id: string;
  comment: string;
  user: User;
  commentType: number;
  url: string;
  subReview: Comment[];
  userLiked: User[];
}
