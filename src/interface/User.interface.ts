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
    following?: Object[];
    followers?: Object[];
    posts?: Object[];
    saved?: Object[];
    favorites?: Object[];
    hated?: Object[];
    trash?: Object[];
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

