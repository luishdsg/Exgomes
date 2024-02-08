import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-ios-kit';
import { HateIcon } from "../../assets/svg/IconsSVG";
import { useThemeController } from "../style/Themed";
import { ReactButtonsPostProps } from '../interface/Props.interface';
import { rootStyle, rowstyle, text } from "../style";
import { colors } from "../style/Colors";
import { ProdRegular } from "./StyledComponents";
import { CommentsPostModal } from './modal/CommentsPostModal';
import getSecureStoreData from '../constants/SecureStore';
import axios from 'axios';
import { API_URL } from '@env';
import { UserRes } from '../base/User.base';
import { formatNumber } from '../pipe/FormatNumber';
import { savePostForUser } from '../services/user.service';

const ReactButtonsPost: React.FC<ReactButtonsPostProps> = ({ onPress, post }) => {
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
    const { t, i18n: { changeLanguage, language } } = useTranslation();
    // const navigation = useNavigation<ReactButtonsPostProps>();

    const likedAnimation = useRef<LottieView | null>(null);
    const [likedVisible, setLikedVisible] = useState(true);
    const [likeCount, setLikeCount] = useState(0);


    const hateAnimation = useRef<LottieView | null>(null);
    const [hateVisible, setHateVisible] = useState(true);
    const [hateCount, setHateCount] = useState(0);

    const [commentsVisible, setCommentsVisible] = useState(themeGTD);
    const [commentsModal, setCommentsModal] = useState(false);

    const [saveVisible, setSaveVisible] = useState(true);



    const _liked = async () => {
        const data = await getSecureStoreData();
        if (!data) console.error('Erro ao obter os dados');
        try {
            if (likedVisible) {
                setLikeCount(1)
                setLikedVisible(!likedVisible)
                setTimeout(() => {
                    likedAnimation.current?.play(0, 45);
                }, 10)
                await axios.post(`${API_URL}/posts/${post._id}/addLikeAndFavorite/${data.userAuth?._id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                console.warn('Deu like:  ' + likedVisible);

            } else {
                setLikeCount(0)
                likedAnimation.current?.play(45, 0);
                setTimeout(() => {
                    setLikedVisible(!likedVisible)
                }, 780)
                await axios.delete(`${API_URL}/posts/${post._id}/removeLikeAndFavorite/${data.userAuth?._id}`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                console.warn('Deu dislike: ' + likedVisible);
            }
        } catch (error) {
            console.error('Erro ao like/dislike no usuário = ' + data.token, error);
        }
    };
    const _verifyLike = async() => {
        const data = await getSecureStoreData();

        if (data.userAuth?.favorites?.includes(post._id)) {
            setLikedVisible(false),
                setTimeout(() => {
                    likedAnimation.current?.play(45, 45);
                }, 10);
        }
    }


    const _hated = async () => {
        const data = await getSecureStoreData();
        if (!data) console.error('Erro ao obter os dados');
        try {
            if (hateVisible) {
                setHateCount(1)
                setHateVisible(!hateVisible)
                setTimeout(() => {
                    hateAnimation.current?.play(0, 15);
                }, 10)
                await axios.post(`${API_URL}/posts/${post._id}/addHated/${data.userAuth?._id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                console.warn('Deu hate:  ' + hateVisible);

            } else {
                setHateCount(0)
                hateAnimation.current?.play(15, 0);
                setTimeout(() => {
                    setHateVisible(!hateVisible)
                }, 780)
                await axios.delete(`${API_URL}/posts/${post._id}/removeHated/${data.userAuth?._id}`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                console.warn('Deu unhate: ' + hateVisible);
            }
        } catch (error) {
            console.error('Erro ao hate/unhated no usuário = ' + data.token, error);
        }
    };
    const _verifyHated = async() => {
        const data = await getSecureStoreData();

        if (data.userAuth?.hated?.includes(post._id)) {
            setHateVisible(false),
                setTimeout(() => {
                    hateAnimation.current?.play(15, 15);
                }, 10);
        }
    }

    const _comments = () => {
        setCommentsModal(!commentsModal)
        if (commentsVisible !== themeGTD) {
            setCommentsVisible(themeGTD)
        } else {
            setCommentsVisible(colors.patternColor)
        }
    };


    const _save = async () => {
        const data = await getSecureStoreData();
        if (!data) console.error('Erro ao obter os dados');
        try {
            if (saveVisible) {
                setSaveVisible(!saveVisible)
                savePostForUser(post._id, data.userAuth?._id, saveVisible)
            } else {
                setSaveVisible(!saveVisible)
                savePostForUser(post._id, data.userAuth?._id, saveVisible)
            }
            console.warn('Deu _save: ' + saveVisible);

        } catch (error) {
            console.error('Erro ao hate/unhated no usuário = ' + data.token, error);
        }
    };
    const _verifySaved = async() => {const data = await getSecureStoreData();if (data.userAuth?.saved?.includes(post._id)) setSaveVisible(false) }


    useEffect(() => {
        // _getUserAuth();
        _verifyLike();
        _verifyHated();
        _verifySaved();
        // console.log('like verificado')

    }, [
        // data.userAuth?.hated,
        // data.userAuth?.favorites,
        // data.userAuth?.saved,
        post._id
    ]);


    return (

        <View style={[rowstyle.row, rootStyle.centralize, rootStyle.px1, rootStyle.h60, rootStyle.pb1, {}]}>
            <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50, rootStyle.h60, { backgroundColor: 'transparent' }]}>
                {likedVisible ? (
                    <TouchableOpacity style={[rootStyle.centralize, rootStyle.pt2, {}]} onPress={_liked}>
                        <Icon size={50 * 0.6} name={"heart-outline"} color={themeGTD} />
                    </TouchableOpacity>
                ) : (
                    <TouchableWithoutFeedback style={[rootStyle.centralize, {}]} onPress={_liked}>
                        <LottieView
                            loop={false}
                            duration={1000}
                            ref={likedAnimation}
                            style={{
                                width: 70 * 0.9,
                                height: 70 * 0.9,
                            }}
                            source={require('../../assets/json/heart.json')}
                        />
                    </TouchableWithoutFeedback>
                )}
                <ProdRegular style={[text.fz10, rootStyle.Pabsolute, { bottom: 5, color: themeTDG }]}>
                    {post.likes?.length === 0 && formatNumber(4824 + hateCount, t)}
                </ProdRegular>
            </View>
            <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50, rootStyle.h60, {}]}>
                {hateVisible ? (
                    <TouchableOpacity style={[rootStyle.pl3, {}]} onPress={_hated}>
                        <HateIcon color={themeGTD} />
                    </TouchableOpacity>
                ) : (
                    <TouchableWithoutFeedback onPress={_hated}>
                        <LottieView
                            loop={false}
                            duration={2000}
                            ref={hateAnimation}
                            style={[
                                {
                                    width: 50 * 0.7,
                                    height: 50 * 0.7,
                                }]}
                            source={require('../../assets/json/hate.json')}
                        />
                    </TouchableWithoutFeedback>
                )}
                <ProdRegular style={[text.fz10, rootStyle.Pabsolute, { bottom: 5, color: themeTDG }]}>
                    {post.hated?.length === 0 && formatNumber(4824 + hateCount, t)}
                </ProdRegular>

            </View>
            <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50, rootStyle.h60, {}]}>
                <TouchableOpacity style={[{}]} onPress={_comments}>
                    <Icon name={'chatbubble-outline'} size={50 * 0.5} color={commentsVisible} />
                </TouchableOpacity>
                <ProdRegular style={[text.fz10, rootStyle.Pabsolute, { bottom: 5, color: themeTDG }]}>
                    {post.comments?.length !== 0 && formatNumber(1234 + hateCount, t)}
                </ProdRegular>
            </View>

            <View style={[rowstyle["12col"], {}]}>
                <TouchableOpacity style={[rootStyle.justifyEnd, rowstyle.row, rootStyle.alignCenter, {}]} onPress={_save}>
                    <Icon name={saveVisible ? 'bookmark-outline' : 'bookmark'} size={27} color={themeGTD} />
                </TouchableOpacity>
            </View>
            {commentsModal && <CommentsPostModal post={post} onClose={() => setCommentsModal(false)} />}
        </View>
    );
}

export { ReactButtonsPost };
