import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-ios-kit';
import { HateIcon } from "../../assets/svg/IconsSVG";
import { useThemeController } from "../constants/Themed";
import { ReactButtonsPostProps } from '../interface/Props.interface';
import { rootStyle, rowstyle, text } from "../style";
import { colors } from "../style/Colors";
import { ProdRegular } from "./StyledComponents";
import { CommentsPostModal } from './modal/CommentsPostModal';
import getSecureStoreData from '../constants/SecureStore';
import axios from 'axios';
import { API_URL } from '@env';
import { UserRes } from '../interface/User.interface';
import { formatNumber } from '../pipe/FormatNumber';

const ReactButtonsPost: React.FC<ReactButtonsPostProps> = ({ onPress, user, post }) => {
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
    const { t, i18n: { changeLanguage, language } } = useTranslation();
    // const navigation = useNavigation<ReactButtonsPostProps>();
    const [userAuth, setUserAuth] = useState<UserRes>();

    const likedAnimation = useRef<LottieView | null>(null);
    const [likedVisible, setLikedVisible] = useState(true);

    const hateAnimation = useRef<LottieView | null>(null);
    const [hateVisible, setHateVisible] = useState(true);

    const [commentsVisible, setCommentsVisible] = useState(themeGTD);
    const [commentsModal, setCommentsModal] = useState(false);


    const [saveVisible, setSaveVisible] = useState('bookmark-outline');
    const [isSaveVisible, setIsSaveVisible] = useState(false);
    const animatedSave = useRef(new Animated.Value(0)).current;




    const _liked = async () => {
        const data = await getSecureStoreData();
        if (!data) console.error('Erro ao obter os dados');
        try {
            if (likedVisible) {
                setLikedVisible(!likedVisible)
                setTimeout(() => {
                    likedAnimation.current?.play(0, 45);
                }, 10)
                await axios.post(`${API_URL}/posts/${post._id}/addLikeAndFavorite/${user._id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                console.warn('Deu like:  ' + likedVisible);

            } else {
                likedAnimation.current?.play(45, 0);
                setTimeout(() => {
                    setLikedVisible(!likedVisible)
                }, 780)
                await axios.delete(`${API_URL}/posts/${post._id}/removeLikeAndFavorite/${user._id}`, {
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
    const _verifyLike = () => {
        if (user?.favorites?.includes(post._id)) {
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
                setHateVisible(!hateVisible)
                setTimeout(() => {
                    hateAnimation.current?.play(0, 15);
                }, 10)
                await axios.post(`${API_URL}/posts/${post._id}/addHated/${user._id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                console.warn('Deu hate:  ' + hateVisible);

            } else {
                hateAnimation.current?.play(15, 0);
                setTimeout(() => {
                    setHateVisible(!hateVisible)
                }, 780)
                await axios.delete(`${API_URL}/posts/${post._id}/removeHated/${user._id}`, {
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
    const _verifyHated = () => {
        if (user?.hated?.includes(post._id)) {
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

    const _save = () => {
        setIsSaveVisible(!isSaveVisible);
        Animated.timing(animatedSave, {
            toValue: isSaveVisible ? 0 : 1,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        if (saveVisible !== 'bookmark-outline') {
            setSaveVisible('bookmark-outline')
        } else {
            setSaveVisible('bookmark')
        }
    };


    const safeStyles = {
        opacity: animatedSave,
        transform: [
            {
                translateX: animatedSave.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0],
                }),
            },
        ],
    };

    useEffect(() => {
        // _getUserAuth();
        _verifyLike();
        _verifyHated();
        // console.log('like verificado')

    }, [
        user?.hated,
        user?.favorites,
        post._id
    ]);


    return (

        <View style={[rowstyle.row, rootStyle.centralize, rootStyle.px1, rootStyle.h60, {}]}>
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
                <ProdRegular style={[text.fz12, rootStyle.Pabsolute, { bottom: 0, color: themeTDG }]}>
                    {formatNumber(post.likes?.length)}
                </ProdRegular>
            </View>
            <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50,rootStyle.h60, {}]}>
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
                  <ProdRegular style={[text.fz12, rootStyle.Pabsolute, { bottom: 0, color: themeTDG }]}>
                    {formatNumber(post.hated?.length)}
                </ProdRegular>

            </View>
            <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50, rootStyle.h60,{}]}>
                <TouchableOpacity style={[{}]} onPress={_comments}>
                    <Icon name={'chatbubble-outline'} size={50 * 0.5} color={commentsVisible} />
                </TouchableOpacity>
                <ProdRegular style={[text.fz12, rootStyle.Pabsolute, { bottom: 0, color: themeTDG }]}>
                    {formatNumber(post.comments?.length)}
                </ProdRegular>
            </View>

            <View style={[rowstyle["12col"], {}]}>
                <TouchableOpacity style={[rootStyle.justifyEnd, rowstyle.row, rootStyle.alignCenter, {}]} onPress={_save}>
                    <Animatable.View
                        animation={isSaveVisible ? 'fadeIn' : 'fadeOut'}
                        style={[
                            safeStyles, rootStyle.br100, rootStyle.mr2,
                            {
                                paddingVertical: 8,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: themeBW,
                            }]}
                    >
                        <ProdRegular style={[{ color: themeBW }]}>{t(`post.${isSaveVisible ? 'safe' : 'removed'}`)}!</ProdRegular>
                    </Animatable.View>
                    <Icon name={saveVisible} size={27} color={themeGTD} />
                </TouchableOpacity>
            </View>
            {commentsModal && <CommentsPostModal onClose={() => setCommentsModal(false)} />}
        </View>
    );
}

export { ReactButtonsPost };
