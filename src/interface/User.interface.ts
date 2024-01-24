export interface UserReq {
    username: string;
    password: string | undefined;
}
export interface UserRes {
    _id: string;
    username: string;
    gender?: string,
    photo?: string,
    email?: string,
    birth?: Date,
    local?: string,
    verified?: boolean,
    lang?: string,
    block?: string[];
    following?: string[];
    followers?: string[];
    posts?: string[];
    saved?: string[];
    favorites?: string[];
    trash?: string[];
    accessToken?: string | null;
}
export interface LoginUserReq {
    username: string;
    password: string;
}
export interface LoginUserRes {
    username: string;
    accessToken: string;
}

