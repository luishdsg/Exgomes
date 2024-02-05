import axios from "axios";
import { useEffect, useState } from "react";
import getSecureStoreData from "../constants/SecureStore";
import { PostRes } from "../base/Post.base";
import { API_URL } from "@env";
import { UserRes } from "../base/User.base";

const userByUsername = async (username: string) => {
    const dataToken = await getSecureStoreData();
    if (!dataToken) console.warn('sem token userByUsername = ' + dataToken.token);
    try {
        const user = await axios.get<UserRes>(`${API_URL}/users/username${username}` ,{
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${dataToken?.token}`,
            },
        });
        return user
    } catch (error) {
        console.error('Erro ao registrar userByUsername:', error);
    }
}

const savePostForUser = async (postId: string, userId: string, saveVisible: boolean) => {
    const dataToken = await getSecureStoreData();
    if (!dataToken) console.warn('sem token savePostForUser = ' + dataToken.token);
    try {
        const savePost = await axios.put(`${API_URL}/users/${userId}/${saveVisible ? 'savePost' : 'removePost'}/${postId}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${dataToken?.token}`,
            },
        });
        return savePost
    } catch (error) {
        console.error('Erro ao registrar savePostForUser:', error);
    }
}

const blockUser = async (userId: string, blockUserId: string, blockRule: boolean) => {
    const dataToken = await getSecureStoreData();
    if (!dataToken) console.warn('sem token blockUser = ' + dataToken.token);
    try {
        const savePost = await axios.put(`${API_URL}/users/${userId}/${blockRule ? 'addUserToBlockList' : 'removeUserFromBlockList'}/${blockUserId}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${dataToken?.token}`,
            },
        });
        if(blockRule) console.warn('block');
        else  console.warn('unblock');
        return savePost
    } catch (error) {
        console.error('Erro ao registrar blockUser:', error);
    }
}

export {
    savePostForUser,
    blockUser,
    userByUsername
}


