export interface UserReq {
    username: string;
    password: string | undefined;
}
export interface UserRes {
    _id: number;
    username: string;
    password: string | undefined;
    email?: string;
    photo?: number;
    gender?: string;
}
export interface LoginUserReq {
    username: string;
    password: string;
}
export interface LoginUserRes {
    username: string;
    accessToken: string;
}