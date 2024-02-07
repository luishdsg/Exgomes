import axios from "axios";
import { useEffect, useState } from "react";
import getSecureStoreData from "../constants/SecureStore";
import { PostRes } from "../base/Post.base";
import { API_URL } from "@env";
import { UserRes } from "../base/User.base";

const countPostViews = async (postId: string) => {
    const dataToken = await getSecureStoreData();
    if (!dataToken) console.warn('sem token storage = ' + dataToken.token);
    try {
        const getPostsData = await axios.put<PostRes>(`${API_URL}/posts/${postId}/updateViews`,
            {
                headers: {
                    Authorization: `Bearer ${dataToken?.token}`,
                },
            });
        if (!getPostsData) console.warn('view = ' + getPostsData);
        return getPostsData
    } catch (error) {
        console.error('Erro ao registrar visualização:', error);
    }
}


export {
    countPostViews,
}


