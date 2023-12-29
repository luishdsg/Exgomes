export interface UserReq {
    username: string;
    password: string | undefined;
}
export interface UserRes {
    _id: number;
    username: string;
    gender?: string,
    photo?: string,
    email?: string,
    birth?: string,
    local?: string,
    lang?: string,
    posts?: string[];
    saved?: string[];
    favorites?: string[];
    trash?: string[];
}
export interface LoginUserReq {
    username: string;
    password: string;
}
export interface LoginUserRes {
    username: string;
    accessToken: string;
}