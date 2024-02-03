import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import getSecureStoreData from "../constants/SecureStore";
import { CommentariesRes, PostRes } from "../base/Post.base";
import { API_URL } from "@env";

const likeDislikeCommentsService = async (postId: string, commentId: string, userId: string, rule: string) => {
    const dataToken = await getSecureStoreData();
    const ruleCrud = () => {
        switch (rule) {
            case 'addLikeToComment':
                return 'addLikeToComment'
            case 'removeLikeFromComment':
                return 'removeLikeFromComment'
            default:
                break;
        }
    }
    if (!dataToken) console.warn('sem token likeComments = ' + dataToken?.token);
    try {
        const saveCommentState = await axios.put(`${API_URL}/posts/${postId}/${ruleCrud()}/${commentId}/atUser/${userId}/`,
            {
                headers: {
                    Authorization: `Bearer ${dataToken?.token}`,
                },
            });
        if (ruleCrud() === 'addLikeToComment') console.info('likeComments');
        else console.info('displikecomments');


        return saveCommentState
    } catch (error) {
        console.error('Erro ao registrar likeComments:', error);
    }
}

const postCommentsService = async (postId: string, commentary: string, userId: string) => {
    const dataToken = await getSecureStoreData();
    if (!dataToken) console.warn('sem token storage = ' + dataToken.token);
    console.log('postId:', postId);
    // console.log('commentary:', commentary);
    // console.log('userId:', userId);
    // console.log('token:', dataToken?.token);

    try {
        const saveComment = await axios.post(`${API_URL}/posts/${postId}/addComment/${userId}`, {
            userId: userId,
            content: commentary,
        },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${dataToken?.token}`,
                },
            });
        if (!saveComment) console.warn('saveComment = ' + saveComment, saveComment.data);
        return saveComment
    } catch (error) {
        console.error('Erro ao registrar saveComment:', error);
    }
}

const removeCommentsService = async (postId: string, userId: string) => {
    const dataToken = await getSecureStoreData();
    if (!dataToken) console.warn('sem token storage = ' + dataToken.token);
    try {
        const removeComment = await axios.delete(`${API_URL}/posts/${postId}/removeComment/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${dataToken?.token}`,
                },
            });
        if (!removeComment) console.warn('removeComment = ' + removeComment);
        return removeComment
    } catch (error) {
        console.error('Erro ao registrar removeComment:', error);
    }
}

const _getAllComments = async (pageNumber: number, postId: string) => {
    const dataToken = await getSecureStoreData();
    if (!postId) console.error('parametros pro get postId deu ruim')
    else if (!pageNumber) console.error('parametros pro get pageNumber deu ruim')
    try {
        const listComments = await axios.get<CommentariesRes[]>(`${API_URL}/posts/${postId}/comments?page=${pageNumber}`, {
            headers: {
                Authorization: `Bearer ${dataToken?.token}`,
            },
        });
        return listComments
    } catch (error) {
        console.error('Erro ao registrar _getAllComments:', error);
    }
}


export {
    likeDislikeCommentsService,
    postCommentsService,
    removeCommentsService,
    _getAllComments
}


