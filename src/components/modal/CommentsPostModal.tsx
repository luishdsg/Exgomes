import { API_URL } from "@env";
import { EvilIcons, Feather } from "@expo/vector-icons";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState, } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Dimensions, Easing, Keyboard, KeyboardAvoidingView, Modal, PanResponder, Platform, RefreshControl, SectionList, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-ios-kit";
import { SvgXml } from "react-native-svg";
import { verifiedAccount } from "../../../assets/svg/IconsSVG";
import { CommentariesRes, PostRes } from "../../base/Post.base";
import { UserRes } from "../../base/User.base";
import getSecureStoreData from "../../constants/SecureStore";
import { CommentsPostProps, UserComments } from "../../interface/Props.interface";
import { convertCreatedAt } from "../../pipe/FormatDate";
import { formatNumber } from "../../pipe/FormatNumber";
import { _getAllComments, likeDislikeCommentsService, postCommentsService } from "../../services/comments.service";
import { Images, rootStyle, rowstyle, text } from "../../style";
import { colors } from "../../style/Colors";
import { useThemeController } from "../../style/Themed";
import { vibrate } from "../../tools/Tools";
import { CircleCountCharactere, ImageUserCommentComponent, LineiOSComponent, ProdBold, ProdLight, ProdRegular, TruncatedTextRegular } from "../StyledComponents";

const CommentsPostModal: React.FC<CommentsPostProps> = ({ post, onClose }) => {
    const { themeWB, themeTDG, themeWIB, themeBWI, themeTDWI, themeWD, themeBW, themeGTD, themeGLD, themeWID, themeGLTD, Status, _toggleTheme } = useThemeController();
    const { t } = useTranslation();

    const screenHeight = Dimensions.get('window').height;

    const keyboardVerticalOffset = Platform.OS === 'android' ? -350 : -300;
    const SectionListRef = useRef(null);

    const [commentary, setCommentary] = useState('');
    const [commentaryEmpty, setCommentaryEmpty] = useState(false);

    const [modalOpacity] = useState(new Animated.Value(0));
    const [refreshKey, setRefreshKey] = useState(0);
    const modalCommentaryHeight = useRef(new Animated.Value(screenHeight * 0.6)).current;
    const animatedModalBottom = useRef(new Animated.Value(-(screenHeight * 0.6))).current;

    const [page, setPage] = useState(1);
    const [section, setSection] = useState<any[]>([]);
    const [postData, setPostData] = useState<PostRes>();
    const [userAuth, setUserAuth] = useState<{ userAuth: UserRes; token: string; }>(null);


    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                const newHeight = screenHeight * 0.6 - gestureState.dy;
                Animated.timing(modalCommentaryHeight, {
                    toValue: newHeight,
                    duration: 0,
                    useNativeDriver: false,
                }).start();
            },
            onPanResponderRelease: (_, gestureState) => {
                const releaseHeight = screenHeight * 0.6 - gestureState.dy;
                if (releaseHeight < 0.5 * screenHeight) {
                    _closeBtn();
                }
                Animated.timing(modalCommentaryHeight, {
                    toValue: screenHeight * 0.6,
                    duration: 280,
                    useNativeDriver: false,
                }).start();
            },
        })
    ).current;

    const _getUserAuthorizeData = async () => {
        try {
            const data = await getSecureStoreData();
            if (data) setUserAuth(data);
        } catch (error: any) {
            console.log('sem dados do usuario posthome')
            return error.message;
        }
    };

    const _getUserDetails = useCallback(async () => {
        const allCommentsOfUserId = (await _getAllComments(page, post._id)).data.map((post) => post.userId);
        const allComments = (await _getAllComments(page, post._id));
        const postiD = post;
        setPostData(postiD);
        const usersData = await Promise.all(
            allCommentsOfUserId.map(async (userId) => {
                const userData = await axios.get<UserComments>(`${API_URL}/users/forComments/${userId}`);
                return userData.data;
            })
        );
        const usersMap = usersData.reduce((acc, user) => {
            acc[user._id] = user;
            return acc;
        }, {} as Record<string, UserRes>);

        const sections = Object.values(usersMap).map((user) => {
            const userComments = allComments?.data?.filter((comment) => comment?.userId === user._id)
                .map((comment) => ({ post, user, comment }));
            return {
                title: user.username,
                data: userComments,
            };
        });

        const invertedSections = sections.slice().reverse().map((section) => ({
            ...section,
            title: section.title,
            data: section?.data?.slice().reverse(),
        }));
        setSection(invertedSections);
        console.log('atualiza krl')
    }, []);

    const _createCommentary = async () => {
        if (commentary.trim() === '') {
            setCommentaryEmpty(true);
            vibrate();
            setTimeout(() => { setCommentaryEmpty(false) }, 1000)
        } else {
            await postCommentsService(postData?._id, commentary, userAuth?.userAuth?._id);
            _getUserDetails();
            setRefreshKey((prevKey) => prevKey + 1);
        }

    }

    const _closeBtn = () => {
        Animated.timing(animatedModalBottom, {
            toValue: -1000,
            duration: 200,
            useNativeDriver: false,
        }).start();
        setTimeout(() => {
            onClose();
        }, 140)
    }

    const _timeLine = ({ item }: { item: { post: PostRes; user: UserRes, comment: CommentariesRes } }) => {
        const [likeDislikeComments, setLikeDislikeComments] = useState(false);
        const [likeDislikeCommentsCount, setLikeDislikeCommentsCount] = useState(0);

        const likeDislakeCommentary = () => {
            if (!likeDislikeComments) setLikeDislikeCommentsCount(1)
            else setLikeDislikeCommentsCount(likeDislikeCommentsCount - 1)
            likeDislikeCommentsService(item.post._id, item.comment._id, userAuth?.userAuth?._id, likeDislikeComments ? 'removeLikeFromComment' : 'addLikeToComment')
            setLikeDislikeComments(!likeDislikeComments);
        }
        useEffect(() => {
            if (item.comment?.likes?.includes(userAuth?.userAuth?._id)) setLikeDislikeComments(true)
        }, [item?.comment])


        return (
            <TouchableOpacity
                onPress={likeDislakeCommentary}
            >
                <View style={[rootStyle.w100, rootStyle.mt2, rootStyle.maxW400, { backgroundColor: themeWD, flex: 1, position: 'relative' }]}>
                    <View style={[rowstyle.row, rootStyle.px1, { backgroundColor: 'transparent', position: 'relative' }]}>
                        <View style={[rowstyle["1col"], rootStyle.centralize, rootStyle.maxW50, { backgroundColor: 'transparent' }]}>
                            <View style={[rootStyle.br100, rootStyle.Pabsolute, rootStyle.z10, { top: -2, left: -1, backgroundColor: themeWB, }]}>
                                {item.user?.verified && <SvgXml xml={verifiedAccount} style={[rootStyle.iconVerified, { transform: [{ scale: 0.8, }], }]} />}
                            </View>
                            <ImageUserCommentComponent source={{ uri: item.user?.photo }} />
                        </View>
                        <View style={[rowstyle["10col"], rootStyle.justifyCenter, { backgroundColor: 'transparent' }]}>
                            <View style={[rowstyle.row, { position: 'relative' }]}>
                                <View style={[rowstyle["1col"], rowstyle.row, rootStyle.alignCenter, {}]}>
                                    <TruncatedTextRegular content={String(`@${item.user?.username}`)} maxSize={25} style={[text.fz12, text.leftText, { color: themeGTD, }]} />
                                    <ProdLight style={[text.fz13, rootStyle.ml1, { color: themeGTD }]}>•&nbsp;&nbsp;{t('post.andComment')}&nbsp;{convertCreatedAt(item.comment?.createdAt)}</ProdLight>
                                </View>
                            </View>
                        </View>
                        <View style={[rowstyle["1col"], rootStyle.justifyCenter, { backgroundColor: 'transparent', }]}>
                            <View style={[rowstyle.row, rootStyle.centralize, {}]}>
                                <Icon size={50 * 0.5} name={likeDislikeComments ? 'heart' : 'heart-outline'} color={likeDislikeComments ? colors.pink : themeGTD} />
                                <ProdLight style={[text.fz13, rootStyle.ml1, { color: themeGTD }]}>{formatNumber(item.comment?.likes.length + likeDislikeCommentsCount, t)}</ProdLight>
                            </View>

                        </View>
                    </View>
                    <View style={[rootStyle.w100, { flex: 1, }]}>
                        {item.post.content && (
                            <View style={[rootStyle.w100, rootStyle.py1, rootStyle.ml3, rootStyle.px2, rootStyle.z_1, { flexDirection: 'row', flexWrap: 'wrap', }]}>
                                <ProdRegular style={[text.fz12, { color: themeBW }]}>{item.comment?.content}</ProdRegular>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>

        );
    }

    useEffect(() => {
        Animated.timing(animatedModalBottom, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        Animated.timing(modalOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
        _getUserAuthorizeData();
        _getUserDetails();
    }, [
        post
    ]);

    return (
        <Modal transparent visible={true} animationType="none">
            <KeyboardAvoidingView
                style={rootStyle.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[rootStyle.view, { backgroundColor: colors.blackOp }]}>
                        <Animated.View   {...panResponder.panHandlers} style={[rootStyle.brTop, rootStyle.Pabsolute, rootStyle.w100, {
                            height: modalCommentaryHeight,
                            backgroundColor: themeWD,
                            bottom: animatedModalBottom,
                            left: 0,
                            right: 0,
                            opacity: modalOpacity
                        }]}>
                            <View style={[rootStyle.z10, rootStyle.brTop, rootStyle.h70, rootStyle.w100, { backgroundColor: themeWD }]}>
                                <View style={[rootStyle.pt1, {}]}><LineiOSComponent /></View>
                                <View style={[rootStyle.w100, rowstyle.row, rootStyle.px2, rootStyle.alignCenter, rootStyle.brTop, rootStyle.justifyBetween, rootStyle.maxH60, { backgroundColor: 'transparent', height: '100%' }]}>
                                    <View style={[rowstyle.row, rootStyle.alignCenter, { height: '100%', backgroundColor: 'transparent' }]}>
                                        <ProdBold style={[text.fz20, text.captalize, rootStyle.pr2, { color: themeBW }]}>{t('tools.comments')}</ProdBold>
                                        <ProdRegular style={[text.fz15, { color: themeBW }]}>{formatNumber(postData?.comments.length, t)}</ProdRegular>
                                    </View>
                                    <View style={[rowstyle.row, rootStyle.alignCenter, rootStyle.justifyEnd, { height: '100%', backgroundColor: 'transparent' }]}>
                                        <TouchableOpacity onPress={_closeBtn} style={[Images.PostProfileIco, rootStyle.br100, rootStyle.centralize, { borderWidth: 1, borderColor: themeGLTD }]}>
                                            <EvilIcons name="close" size={24} color={themeBW} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <SectionList
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                ref={SectionListRef}
                                sections={section as any}
                                renderItem={_timeLine}
                                // ListHeaderComponent={_refreshMorePub}
                                keyExtractor={(item, index) => item.comment._id.toString()}
                                // onEndReached={_Empty}
                                // onEndReachedThreshold={10}
                                // onRefresh={_getUserDetails}
                                ListEmptyComponent={<ProdRegular style={[rootStyle.w100, text.centralizeText, rootStyle.py4, text.fz17, { color: themeBW }]}>{t('post.emptyComment')}</ProdRegular>}
                            // ListFooterComponent={<View style={[rootStyle.mb9, {}]}></View>}
                            // stickyHeaderIndices={[0]}
                            />
                        </Animated.View>
                        <View style={[rootStyle.w100, rootStyle.centralize, rootStyle.pb2, Platform.OS === 'ios' && rootStyle.pb3, rootStyle.Pabsolute, { backgroundColor: themeWB, bottom: 0 }]}>
                            <View style={[rowstyle.row, rootStyle.boxShadow, rootStyle.mx2, rootStyle.pt1, { backgroundColor: 'transparent' }]}>
                                <View style={[rowstyle["1col"], rootStyle.centralize, {}]}>
                                    <ImageUserCommentComponent source={{ uri: userAuth?.userAuth?.photo }} />
                                    <CircleCountCharactere commentary={commentary} />
                                </View>
                                <View style={[rowstyle["10col"], rootStyle.ml1, {}]}>
                                    <TextInput
                                        editable={true}
                                        maxLength={200}
                                        contextMenuHidden={false}
                                        multiline
                                        value={commentary}
                                        placeholderTextColor={commentaryEmpty ? colors.red : colors.gray}
                                        placeholder={commentaryEmpty ? t('post.emptyCommentary') : t('post.commentPlaceholder')}
                                        style={[rootStyle.br30,
                                        rootStyle.maxH100,
                                        rootStyle.alignCenter,
                                        rootStyle.w100, text.fz15,
                                        rootStyle.px2, rootStyle.py2,
                                        rootStyle.boxShadow,
                                        {
                                            backgroundColor: themeWID,
                                            color: themeBWI,
                                            borderWidth: 2,
                                            borderColor: commentaryEmpty ? colors.red : themeWID
                                        }]}
                                        onChangeText={(text) => { setCommentary(text); }}
                                    />
                                </View>
                                <View style={[rowstyle["1col"], rootStyle.centralize, rootStyle.ml1, {}]}>
                                    <TouchableOpacity onPress={_createCommentary}>
                                        <Feather name="send" size={24} color={themeTDWI} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <Status />
        </Modal>
    );
};
export {
    CommentsPostModal
};

