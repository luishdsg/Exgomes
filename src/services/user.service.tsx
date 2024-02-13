import { API_URL } from "@env";
import axios from "axios";
import { UserRes } from "../base/User.base";
import getSecureStoreData from "../constants/SecureStore";

const userByUsername = async (username: string) => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token userByUsername = ' + data.token);
    try {
        const user = await axios.get<UserRes>(`${API_URL}/users/username${username}` ,{
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return user.data
    } catch (error) {
        console.error('Erro ao registrar userByUsername:', error);
    }
}


const userById = async (byId: string):Promise<UserRes> => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token userBybyId = ' + data.token);
    try {
        const user = await axios.get<UserRes>(`${API_URL}/users/byId/${byId}` ,{
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return user.data
    } catch (error) {
        console.error('Erro ao registrar userBybyId:', error);
    }
}


const blockedUsers = async (userId: string):Promise<string[]> => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token blockedUsers = ' + data.token + userId);
    try {
        const blockedUsers = await axios.get<string[]>(`${API_URL}/users/${userId}/BlockedUsers` ,{
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return blockedUsers.data
    } catch (error) {
        console.error('Erro ao registrar blockedUsers:', error);
    }
}

const favoritesList = async (userId: string, page: number):Promise<string[]> => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token favoritesList = ' + userId);
    try {
        const favoritesList = await axios.get<string[]>(`${API_URL}/users/${userId}/favorites?page=${page}` ,{
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return favoritesList.data
    } catch (error) {
        console.error('Erro ao registrar favoritesList:', error);
    }
}

const isUserFollowing = async(userId: string) => {const data = await getSecureStoreData(); return data?.Following.includes(userId || '');}


const followUnfollow = async (follower: string) => {
    const data = await getSecureStoreData();
    try {
        if (isUserFollowing(follower)) { //rule here is true
            await axios.delete(`${API_URL}/users/${data?.Id}/unfollow/${follower}`, {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${data.token}`,
                },
            });
            console.warn('Deu unfollow');
        } else {
            await axios.post(`${API_URL}/users/${data.Id}/follow/${follower}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            });
            console.warn('Deu follow');

        }
    } catch (error) {
        console.error('Erro ao seguir/desseguir o usuário', error);
    }
}

export {
    blockedUsers, favoritesList, followUnfollow,
    isUserFollowing, userById, userByUsername
};

