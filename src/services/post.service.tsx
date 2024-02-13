import axios from "axios";
import { useEffect, useState } from "react";
import getSecureStoreData from "../constants/SecureStore";
import { PostRes } from "../base/Post.base";
import { UserRes } from "../base/User.base";
import { API_URL } from "@env";


const postById = async (byId: string): Promise<PostRes> => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token postById = ' + data.token);
    try {
        const posts = await axios.get<PostRes>(`${API_URL}/posts/${byId}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data?.token}`,
            },
        });
        return posts.data
    } catch (error) {
        console.error('Erro ao registrar postById:', error);
    }
}

const countPostViews = async (postId: string) => {
    const dataToken = await getSecureStoreData();
    if (!dataToken) console.warn('sem token storage = ' + dataToken.token);
    if (!postId) console.warn('sem postId no countPostViews = ' + postId);
    console.info('visto = '  + postId);

    try {
        const getPostsData = await axios.put<PostRes>(`${API_URL}/posts/${postId}/updateViews`,
            {
                headers: {
                    Authorization: `Bearer ${dataToken?.token}`,
                },
            });
        return getPostsData
    } catch (error) {
        console.error('Erro ao registrar visualização:', error);
    }
}

const postPerPage = async (page: number) => {
    const dataToken = await getSecureStoreData();
    if (!dataToken) console.warn('sem token storage = ' + dataToken.token);
    try {
        const getPostsData = await axios.get<PostRes[]>(`${API_URL}/posts?page=${page}`, {
            headers: {
                Authorization: `Bearer ${dataToken?.token}`,
            },
        });
        return getPostsData.data
    } catch (error) {
        console.error('Erro ao registrar visualização:', error);
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
        if (blockRule) console.warn('block');
        else console.warn('unblock');
        return blockUser
    } catch (error) {
        console.error('Erro ao registrar blockUser:', error);
    }
}

const favoritePost = async (postId: string, userId: string) => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token savePostForUser = ' + data.token);
    try {
        const favoritePost = await axios.post(`${API_URL}/posts/${postId}/addLikeAndFavorite/${userId}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
        return favoritePost.data
    } catch (error) {
        console.error('Erro ao registrar favoritePost:', error);
    }
}

const unFavoritePost = async (postId: string, userId: string) => {
    const data = await getSecureStoreData();
    if (!data) console.warn('sem token savePostForUser = ' + data.token);
    try {
        const unFavoritePost = await axios.delete(`${API_URL}/posts/${postId}/removeLikeAndFavorite/${userId}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
        return unFavoritePost.data
    } catch (error) {
        console.error('Erro ao registrar unFavoritePost:', error);
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



export {
    countPostViews,
    savePostForUser,
    blockUser,
    postById,
    postPerPage,
    favoritePost,
    unFavoritePost
}


