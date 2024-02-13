/* eslint-disable react-native/no-inline-styles */
import { API_URL } from "@env";
import axios from "axios";
import { format } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Dimensions, Image, ImageBackground, Modal, SectionList, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from "react-native-ios-kit";
import { SvgXml } from 'react-native-svg';
import { verifiedAccount } from "../../../assets/svg/IconsSVG";
import * as SecureStore from 'expo-secure-store';
import { RefreshControl } from "react-native-gesture-handler";
import { PostRes } from "../../base/Post.base";
import { UserRes } from "../../base/User.base";
import { LoadProfilePost } from "../LoadContent";
import { ReactButtonsPost } from "../ReactButtonsPost";
import { ImageProfileComponent, ProdLight, ProdRegular, ScrollToTopButtonComponent, TruncatedTextBold } from "../StyledComponents";
import ZoomableImage from "../modal/ViewImageModal";
import { default as getSecureStoreData } from "../../constants/SecureStore";
import { TimeLineHomeProps, SectionDataTimeLineProps } from "../../interface/Props.interface";
import { countPostViews, postPerPage } from "../../services/post.service";
import { blockedUsers, followUnfollow, isUserFollowing, userByUsername } from "../../services/user.service";
import { rootStyle, rowstyle, text } from "../../style";
import { colors } from "../../style/Colors";
import { useThemeController } from "../../style/Themed";
import { SettingsPostModal } from "../modal/SettingsPostModal";

const TimeLineHome: React.FC<TimeLineHomeProps> = ({ route }) => {
    const SectionListRef = useRef(null);
    const { onLoading } = route.params;
    const { t } = useTranslation();
    const [sectionData, setSectionData] = useState<SectionDataTimeLineProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [noMorePost, setNoMorePost] = useState(false);
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeTDWO, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    const _getPosts = useCallback(async (pageNumber: number) => {
        setTimeout(async () => {
            try {
                const data = await getSecureStoreData();
                if (!data.Id) console.warn('sem dados storage = ' + data.Id);
                const getPostsData = await axios.get<PostRes[]>(`${API_URL}/posts?page=${page}`, {
                    headers: { Authorization: `Bearer ${data?.token}`, },
                });
                if (getPostsData.data?.length === 0) {
                    setNoMorePost(true);
                    return;
                }
                // remove blocked users
                const userIds = getPostsData.data?.map((post) => post.userId);
                const blockedList = await blockedUsers(data.Id)
                const removeBlockedsUsers = userIds.filter(_id => !blockedList.includes(_id));
                const usersData = await Promise.all(
                    removeBlockedsUsers.map(async (userId) => {
                        const userData = await axios.get<UserRes>(`${API_URL}/users/byId/${userId}`);
                        return userData.data;
                    })
                );
                const usersMap = usersData.reduce((acc, user) => {
                    acc[user._id] = user;
                    return acc;
                }, {} as Record<string, UserRes>);

                const section = Object.values(usersMap)
                    .filter((user) => !data?.Blocked.includes(user._id))
                    .map((user) => {
                        const userPosts = getPostsData.data
                            .filter((post) => post.userId === user._id)
                            .map((post) => ({ post, user }));
                        return {
                            title: user.username,
                            data: userPosts,
                        };
                    });
                const invertedSections = section.slice().reverse().map((section) => ({
                    ...section,
                    title: section.title,
                    data: section.data.slice().reverse(),
                }));
                setSectionData(invertedSections);
                setPage(pageNumber + 1);
                const userAuth = await userByUsername(data.Username)
                await SecureStore.setItemAsync('userAuthorizeBlocked', JSON.stringify(userAuth.block));
                await SecureStore.setItemAsync('userAuthorizeFollowing', JSON.stringify(userAuth.following));
                await SecureStore.setItemAsync('userAuthorizeHated', JSON.stringify(userAuth.hated));
                await SecureStore.setItemAsync('userAuthorizeFavorites', JSON.stringify(userAuth.favorites));
                await SecureStore.setItemAsync('userAuthorizeFollowers', JSON.stringify(userAuth.followers));
                await SecureStore.setItemAsync('userAuthorizePhoto', JSON.stringify(userAuth.photo));
                await SecureStore.setItemAsync('userAuthorizeSaved', JSON.stringify(userAuth.saved));
                await SecureStore.setItemAsync('userAuthorizeLocal', JSON.stringify(userAuth.local));
                await SecureStore.setItemAsync('userAuthorizeUsername', JSON.stringify(userAuth.username));
            } catch (error: any) {
                console.error('Busca pelso post na home deu ruim', error);
            }
            finally {
                console.warn('loading falso')
                setLoading(false);
            }
        }, 500);
    }, []);


    const _timeLinePub = ({ item }: { item: { post: PostRes; user: UserRes } }) => {
        const [imageUri, setImageUri] = useState(item.post.photo);
        const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
        const [modalImage, setModalImage] = useState(false);
        const [modalSettings, setModalSettings] = useState(false);

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
                        <TouchableOpacity onPress={() => setModalSettings(true)} style={[rootStyle.br100, rootStyle.p2, { backgroundColor: 'transparent' }]}>
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
                            <TouchableWithoutFeedback onPress={() => setModalImage(true)}>
                                <ImageBackground
                                    resizeMode="cover"
                                    style={[
                                        rootStyle.br30,
                                        rootStyle.w100,
                                        rootStyle.overflowH,
                                        {
                                            maxHeight: screenHeight * 0.5,
                                            aspectRatio: imageDimensions.height > screenHeight * 0.5 ? imageDimensions.width > imageDimensions.height ? 16 / 9 : 9 / 10 : 5 / 3,
                                        }]}
                                    source={{ uri: item.post?.photo }} />
                            </TouchableWithoutFeedback >
                        </View>
                    )}
                    <ReactButtonsPost
                        post={item.post}
                        unfollowList={() => { }}
                        unSaveList={() => { }}
                        onPress={() => { _getPosts(page) }}
                    />
                </View>
                <View style={[rootStyle.w100, { height: 1, backgroundColor: themeTDWO }]} />
                <Modal visible={modalImage} transparent statusBarTranslucent={true}>
                    <ZoomableImage uri={item.post.photo} fadeInOut={() => true} onClose={() => setModalImage(false)} />
                </Modal>
                <Modal visible={modalSettings} transparent statusBarTranslucent={true}>
                    <SettingsPostModal
                        post={item.post}
                        author={item.user}
                        isUserFollowing={isUserFollowing(item.user._id)}
                        followUnfollow={() => {
                            followUnfollow(item.user._id),
                                // showModalSettings(false),
                                _getPosts(page)
                        }}
                        onClose={() => { _getPosts(page), setModalSettings(false) }}
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

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        viewableItems.forEach(async ({ item }) => { await countPostViews(item.post._id) });
    }).current;

    const _onDimensionsChange = () => {
        setScreenHeight(Dimensions.get('window').height);
        Dimensions.addEventListener('change', _onDimensionsChange);
    };

    const _onLoadPage = async () => {
        console.warn('ué = ' + onLoading)
        if (onLoading || SectionListRef.current) {
            SectionListRef.current.scrollToLocation({
                sectionIndex: 0,
                itemIndex: 0,
                viewOffset: 0,
                viewPosition: 0,
                animated: true,
            });
        } else {
            _handleCheckEndPage();
        }
    }

    useEffect(() => {
        _onLoadPage();
        _onDimensionsChange();
    }, [page, loading, onLoading]);

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
                    onEndReached={_handleCheckEndPage}
                    onEndReachedThreshold={0.1}
                    // onRefresh={_refreshMorePub}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 50,
                        minimumViewTime: 1000,
                    }}
                    ListEmptyComponent={<ActivityIndicator size="large" color={colors.patternColor} />}
                    ListFooterComponent={_refreshMorePub}
                    // stickyHeaderIndices={[0]}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => _getPosts(page)}
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

export default TimeLineHome;



{/* <Icon size={30} name={"ellipsis-horizontal-circle-outline"} /> */ }


{/* <Icon size={30} name={"fast-food-outline"} /> */ }


{/* <Icon size={30} name={"female"} />
                             */}

{/* <Icon size={30} name={"finger-print-outline"} /> */ }



{/* <Icon size={30} name={"flower-outline"} /> */ }


{/* <Icon size={30} name={"gift"} /> */ }

{/* <Icon size={30} name={"gift-outline"} /> */ }
