/* eslint-disable react-native/no-inline-styles */
import { API_URL } from "@env";
import axios, { AxiosResponse } from "axios";
import { format } from 'date-fns';
import { BlurView } from "expo-blur";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Animated, Dimensions, Image, ImageBackground, Modal, PanResponder, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Icon } from "react-native-ios-kit";
import { SvgXml } from 'react-native-svg';
import { verifiedAccount } from "../../assets/svg/IconsSVG";
import * as Haptics from 'expo-haptics';
import * as SecureStorage from 'expo-secure-store';

import getSecureStoreData from "../constants/SecureStore";
import { useThemeController } from "../style/Themed";
import { PostHomeProps, SectionDataPostProps } from "../interface/Props.interface";
import { PostRes } from "../base/Post.base";
import { UserRes } from "../base/User.base";
import { profileStyle, rootStyle, rowstyle, text } from "../style";
import { colors } from "../style/Colors";
import { LoadProfilePost } from "../components/LoadContent";
import { ReactButtonsPost } from "../components/ReactButtonsPost";
import { ImageProfileComponent, ProdLight, ProdRegular, ScrollToTopButtonComponent, TruncatedTextBold } from "../components/StyledComponents";
import ZoomableImage from "../components/modal/ViewImageModal";
import { RefreshControl } from "react-native-gesture-handler";
import SecureStore from "../constants/SecureStore";
import { SettingsPostModal } from "../components/modal/SettingsPostModal";
import { countPostViews } from "../services/post.service";

const PostHome: React.FC = () => {
    const SectionListRef = useRef(null);
    const { t } = useTranslation();
    const [sectionData, setSectionData] = useState<SectionDataPostProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [userAuth, setUserAuth] = useState<{userAuth: UserRes;token: string;}>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [noMorePost, setNoMorePost] = useState(false);
    const source = axios.CancelToken.source();
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeTDWO, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    const _getPosts = useCallback(async (pageNumber: number) => {
        setTimeout(async () => {
            try {
                const data = await getSecureStoreData();
                if (!data) console.warn('sem dados storage = ' + data);
                const getPostsData = await axios.get<PostRes[]>(`${API_URL}/posts?page=${pageNumber}`, {
                    headers: {
                        Authorization: `Bearer ${data?.token}`,
                    },
                });
                if (getPostsData.data.length === 0) {
                    setNoMorePost(true);
                    return;
                }
                const userIds = getPostsData.data.map((post) => post.userId)
                const usersData = await Promise.all(
                    userIds.map(async (userId) => {
                        const userData = await axios.get<UserRes>(`${API_URL}/users/byId/${userId}`);
                        return userData.data;
                    })
                );
                const usersMap = usersData.reduce((acc, user) => {
                    acc[user._id] = user;
                    return acc;
                }, {} as Record<string, UserRes>);

                const sections = Object.values(usersMap).map((user) => {
                    const userPosts = getPostsData.data
                        .filter((post) => post.userId === user._id)
                        .map((post) => ({ post, user }));
                    return {
                        title: user.username,
                        data: userPosts,
                    };
                });
                const invertedSections = sections.slice().reverse().map((section) => ({
                    ...section,
                    title: section.title,
                    data: section.data.slice().reverse(),
                }));
                setSectionData(invertedSections);
                setPage(pageNumber + 1);
            } catch (error: any) {
                console.error('Busca pelso post na home deu ruim', error);
                // return error.message;
            }
            finally {
                console.warn('loading falso')
                setLoading(false);
            }
        }, 1000)
    }, []);

    const _getUserAuthorizeData = async () => {
        try {
          const data = await getSecureStoreData();
          if (data) setUserAuth(data);
        } catch (error: any) {
          console.log('sem dados do usuario posthome')
          return error.message;
        }
      };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        viewableItems.forEach(({ item }) => {
          countPostViews(item.post._id)
        });
      }).current; 
    

    const isUserFollowing = (userId: string) => {
        const findInList = userAuth?.userAuth?.following?.includes(userId || '');
        return findInList
    }


    const _followUnfollow = async (follower: string) => {
            try {
                if (isUserFollowing(follower)) {
                    await axios.delete(`${API_URL}/users/${userAuth?.userAuth?._id}/unfollow/${follower}`, {
                        headers: {
                            accept: '*/*',
                            Authorization: `Bearer ${userAuth.token}`,
                        },
                    });
                    console.warn('Deu unfollow');
                } else {
                    await axios.post(`${API_URL}/users/${userAuth.userAuth?._id}/follow/${follower}`, {
                        headers: {
                            Authorization: `Bearer ${userAuth.token}`,
                        },
                    });
                    console.warn('Deu follow');

                }
            } catch (error) {
                console.error('Erro ao seguir/desseguir o usuário', error);
            }
        

    }

    const _onDimensionsChange = () => {
        setScreenHeight(Dimensions.get('window').height);
        Dimensions.addEventListener('change', _onDimensionsChange);
    };

    useEffect(() => {
        if (loading) {
            _getUserAuthorizeData();
            _getPosts(page);
        };
        _onDimensionsChange();
        return () => {
            source.cancel();
        };
    }, [_getPosts, page]);



    const _timeLinePub = ({ item }: { item: { post: PostRes; user: UserRes } }) => {
        const [imageUri, setImageUri] = useState(item.post.photo);
        const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
        const [modalImage, setModalImage] = useState(false);
        const [modalSettings, setModalSettings] = useState(false);


        const showImagePost = (visible: boolean) => { setModalImage(visible); };
        const showModalSettings = (visible: boolean) => { setModalSettings(visible); };

        const onViewableItemsChanged = useRef(({ viewableItems }) => {
            viewableItems.forEach(({ item }) => {
                console.log('Item visível:', item.comment._id);
            });
        }).current;

        useEffect(() => {
            if (imageUri && imageUri !== "string") Image.getSize(imageUri, (width, height) => { setImageDimensions({ width, height }) });
        }, [imageUri]);
        return (
            <View style={[rootStyle.w100, rootStyle.pt2, { backgroundColor: themeWIB, flex: 1, position: 'relative' }]}>
                <View style={[rowstyle.row, rootStyle.px1, { backgroundColor: 'transparent', position: 'relative' }]}>
                    <View style={[rowstyle["1col"], rootStyle.centralize, rootStyle.maxW50, { backgroundColor: 'transparent' }]}>
                        <ImageProfileComponent source={{ uri: item.user?.photo }} />
                    </View>
                    <View style={[rowstyle["7col"], rootStyle.pl1, rootStyle.justifyCenter, {}]}>
                        <View style={[rowstyle.row, { position: 'relative' }]}>
                            <View style={[rowstyle["1col"], rowstyle.row, rootStyle.alignCenter, {}]}>
                                <TruncatedTextBold content={String(item.user?.username)} maxSize={20} style={[text.fz17, text.leftText, { color: themeBWI, }]} />
                                {item.user?.verified &&
                                    <SvgXml xml={verifiedAccount} style={[rootStyle.iconVerified, rootStyle.ml1, {}]} />
                                }
                            </View>
                        </View>
                        <ProdLight style={[text.fz13, { color: themeDG }]}>
                            {format(new Date(item.post?.createdAt), 'dd•MMM yyyy-HH:mm a',)}
                        </ProdLight>
                    </View>
                    <View style={[rowstyle["1col"], rowstyle.row, rootStyle.justifyEnd, rootStyle.alignCenter, { backgroundColor: 'transparent' }]}>
                        <TouchableOpacity onPress={() => showModalSettings(true)} style={[rootStyle.br100, rootStyle.p2, { backgroundColor: 'transparent' }]}>
                            <Icon name={"ellipsis-horizontal-outline"} size={24} color={themeTDWI} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[rootStyle.w100, { flex: 1, }]}>
                    {item.post.content && (
                        <View style={[rootStyle.w100, rootStyle.py1, rootStyle.px2, rootStyle.z_1, { flexDirection: 'row', flexWrap: 'wrap', }]}>
                            <ProdRegular style={[text.fz17, { color: themeBW }]}>{item.post?.content}</ProdRegular>
                        </View>
                    )}
                    {item.post.photo && (
                        <View style={[rootStyle.justifyCenter, rootStyle.w100, rootStyle.px2, rootStyle.z_1, { flex: 1, maxHeight: screenHeight * 0.5, backgroundColor: 'transparent' }]}>
                            <TouchableWithoutFeedback onPress={() => showImagePost(true)}>
                                <ImageBackground
                                    resizeMode="cover"
                                    style={[
                                        rootStyle.br30,
                                        {
                                            width: '100%',
                                            overflow: 'hidden',
                                            height: imageDimensions.height * 0.3,
                                            maxHeight: screenHeight * 0.5
                                        }]}
                                    source={{ uri: item.post?.photo }} />
                            </TouchableWithoutFeedback >
                        </View>
                    )}
                    <ReactButtonsPost
                        post={item.post}
                        user={userAuth?.userAuth}
                        onPress={() => { _getPosts(page) }}
                    />
                </View>
                <View style={[rootStyle.w100, { height: 1, backgroundColor: themeTDWO }]} />
                <Modal visible={modalImage} transparent statusBarTranslucent={true}>
                    <ZoomableImage uri={item.post.photo} fadeInOut={showImagePost} onClose={() => setModalImage(false)} />
                </Modal>
                <Modal visible={modalSettings} transparent statusBarTranslucent={true}>
                    <SettingsPostModal
                        post={item.post}
                        isUserFollowing={isUserFollowing(item.user._id)}
                        followUnfollow={() => {
                            _followUnfollow(item.user._id),
                                showModalSettings(false),
                                _getPosts(page)
                                _getUserAuthorizeData()
                        }}
                        onClose={() => showModalSettings(false)}
                    />
                </Modal>
            </View>
        );
    }

    const _refreshMorePub = () => {
        return (
            <View>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.patternColor} />
                ) : (
                    <>
                        {noMorePost ? (
                            <ActivityIndicator size="large" color={colors.patternColor} />
                        ) : (
                            <View style={[rootStyle.w100, rootStyle.centralize, { backgroundColor: themeWIB }]}>
                                <ScrollToTopButtonComponent onPress={() => { _getPosts(page) }} sectionListRef={SectionListRef} />
                            </View>
                        )}
                    </>
                )}
            </View>
        )
    }

    const _handleCheckEndPage = () => { if (loading) _getPosts(page); };


    return (
        <>
            {loading ? (
                <LoadProfilePost showLoad={loading} />
            ) : (
                <SectionList
                    ref={SectionListRef}
                    sections={sectionData as any}
                    keyExtractor={(item, index) => item.post._id.toString()}
                    renderItem={_timeLinePub}
                    // ListHeaderComponent={_refreshMorePub}
                    // keyExtractor={(item: PostRes, index) => `${item._id.toString()}_${index}`}
                    onEndReached={_handleCheckEndPage}
                    onEndReachedThreshold={0.1}
                    // onRefresh={_refreshMorePub}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 50,
                        minimumViewTime: 2000,

                    }}
                    ListEmptyComponent={<ActivityIndicator size="large" color={colors.patternColor} />}
                    ListFooterComponent={_refreshMorePub}
                    // stickyHeaderIndices={[0]}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => { _getPosts(page); _getUserAuthorizeData(); }}
                            tintColor="#007AFF"
                            titleColor="#007AFF"
                            progressViewOffset={0}
                            colors={['#007AFF']}
                            progressBackgroundColor={themeWB}
                        />
                    }
                />
            )}
            <Status />
        </>
    );
}

export default PostHome;



{/* <Icon size={30} name={"ellipsis-horizontal-circle-outline"} /> */ }


{/* <Icon size={30} name={"fast-food-outline"} /> */ }


{/* <Icon size={30} name={"female"} />
                             */}

{/* <Icon size={30} name={"finger-print-outline"} /> */ }



{/* <Icon size={30} name={"flower-outline"} /> */ }


{/* <Icon size={30} name={"gift"} /> */ }

{/* <Icon size={30} name={"gift-outline"} /> */ }
