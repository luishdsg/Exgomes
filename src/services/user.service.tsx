import axios from "axios";
import { useEffect, useState } from "react";
import getSecureStoreData from "../constants/SecureStore";
import { PostRes } from "../base/Post.base";
import { API_URL } from "@env";

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

export {
    savePostForUser
}


