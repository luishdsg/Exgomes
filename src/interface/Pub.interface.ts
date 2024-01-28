export interface Comment {
    id: string;
    content: string;
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
    comments: Comment[];
    reposts: number;
}