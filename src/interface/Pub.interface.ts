export interface PubRes {
    _id: string;
    userId: string;
    createdAt: Date;
    content: string;
    photo: string;
    tag: string;
    views: number;
    likes: number;
    hates: number;
    comments: number;
    reposts: number;
}