import axios from "axios";
import { useEffect, useState } from "react";
import getSecureStoreData from "../constants/SecureStore";
import { PostRes } from "../base/Post.base";
import { API_URL } from "@env";
import { UserRes } from "../base/User.base";

const userByUsername = async (username: string) => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token userByUsername = ' + data.token);
    try {
        const user = await axios.get<UserRes>(`${API_URL}/users/username${username}` ,{
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return user
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
        const user = await axios.get<string[]>(`${API_URL}/users/${userId}/blockedUserIds` ,{
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return user.data
    } catch (error) {
        console.error('Erro ao registrar blockedUsers:', error);
    }
}


const savePostForUser = async (postId: string, userId: string, saveVisible: boolean) => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token savePostForUser = ' + data.token);
    try {
        const savePost = await axios.put(`${API_URL}/users/${userId}/${saveVisible ? 'savePost' : 'removePost'}/${postId}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return savePost
    } catch (error) {
        console.error('Erro ao registrar savePostForUser:', error);
    }
}

const blockUser = async (userId: string, blockUserId: string, blockRule: boolean) => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token blockUser = ' + data.token);
    try {
        const blockUser = await axios.put(`${API_URL}/users/${userId}/${blockRule ? 'addUserToBlockList' : 'removeUserFromBlockList'}/${blockUserId}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        if(blockRule) console.warn('block');
        else console.warn('unblock');
        return blockUser
    } catch (error) {
        console.error('Erro ao registrar blockUser:', error);
    }
}

const getBlockUser = async (username: string) => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token blockUser = ' + data.token);
    try {
        const getBlockUser = await axios.get<string[]>(`${API_URL}/users/${username}/blockedUsers`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return getBlockUser
    } catch (error) {
        console.error('Erro ao registrar blockUser:', error);
    }
}



export {
    savePostForUser,
    blockUser,
    getBlockUser,
    userByUsername,
    userById,
    blockedUsers

}
