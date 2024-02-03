export interface CommentariesRes {
  userId: string;
  content: string;
  likes: Object[];
  _id: string;
  createdAt: Date;
}
export interface PostRes {
  _id: string;
  userId: string;
  createdAt: Date;
  content: string;
  photo: string;
  tag: string;
  views: number;
  likes: Object[];
  hated: Object[];
  comments: CommentariesRes[];
  reposts: number;
}