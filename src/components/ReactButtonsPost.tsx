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
import { rootStyle, rowstyle } from "../style";
import { colors } from "../style/Colors";
import { ProdRegular } from "./StyledComponents";
import { CommentsPostModal } from './modal/CommentsPostModal';

const ReactButtonsPost: React.FC = () => {
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
    const { t, i18n: { changeLanguage, language } } = useTranslation();
    const navigation = useNavigation<ReactButtonsPostProps>();

    const likedAnimation = useRef<LottieView | null>(null);
    const [likedisPlayingForward, setLikedIsPlayingForward] = useState(true);
    const [likedVisible, setLikedVisible] = useState(true);

    const hateAnimation = useRef<LottieView | null>(null);
    const [hateisPlayingForward, setHateIsPlayingForward] = useState(true);
    const [hateVisible, setHateVisible] = useState(true);

    const [commentsVisible, setCommentsVisible] = useState(themeGTD);
    const [commentsModal, setCommentsModal] = useState(false);


    const [saveVisible, setSaveVisible] = useState('bookmark-outline');
    const [isSaveVisible, setIsSaveVisible] = useState(false);
    const animatedSave = useRef(new Animated.Value(0)).current;

    const _liked = () => {
        if (likedisPlayingForward) {
            setLikedVisible(false)
            setLikedIsPlayingForward(false)
            setTimeout(() => {
                likedAnimation.current?.play(0, 45);
            }, 1)
        } else {
            setLikedIsPlayingForward(true)
            likedAnimation.current?.play(45, 0);
            setTimeout(() => {
                setLikedVisible(true)
            }, 780)
        }
    };

    const _hated = () => {
        if (hateisPlayingForward) {
            setHateVisible(false)
            setHateIsPlayingForward(false)
            setTimeout(() => {
                hateAnimation.current?.play(0, 15);
            }, 1)
        } else {
            setHateIsPlayingForward(true)
            hateAnimation.current?.play(15, 0);
            setTimeout(() => {
                setHateVisible(true)
            }, 380)
        }
    };

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
    });


    return (

        <View style={[rowstyle.row, rootStyle.centralize, rootStyle.px1, { height: 60 }]}>
            <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50,{}]}>
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
            </View>
            <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50,{}]}>
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
            </View>
            <View style={[rowstyle["2col"], rootStyle.centralize,  rootStyle.maxW50,{}]}>
                <TouchableOpacity style={[{}]} onPress={_comments}>
                    <Icon name={'chatbubble-outline'} size={50 * 0.5} color={commentsVisible} />
                </TouchableOpacity>
            </View>

            <View style={[rowstyle["12col"], {}]}>
                <TouchableOpacity style={[rootStyle.justifyEnd, rowstyle.row, rootStyle.alignCenter, {}]} onPress={_save}>
                    <Animatable.View
                        animation={isSaveVisible ? 'fadeIn' : 'fadeOut'}
                        style={[
                            safeStyles, rootStyle.br100,  rootStyle.mr2,
                            {
                                paddingVertical:8,
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
