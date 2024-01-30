export interface Commentaries {
  _id: string;
  userId: string;
  content: string;
  like: number;
  createdAt: Date;
}
export interface PubRes {
  _id: string;
  userId: string;
  createdAt: Date;
  content: string;
  photo: string;
  tag: string;
  views: number;
  likes: Object[];
  hated: Object[];
  comments: Commentaries[];
  reposts: number;
}