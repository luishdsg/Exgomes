import { API_URL } from "@env";
import axios from "axios";
import { format } from 'date-fns';
import { BlurView } from "expo-blur";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Animated, Dimensions, Image, ImageBackground, Modal, PanResponder, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Icon } from "react-native-ios-kit";
import { SvgXml } from 'react-native-svg';
import { verifiedAccount } from "../../assets/svg/IconsSVG";
import * as Haptics from 'expo-haptics';

import getSecureStoreData from "../constants/SecureStore";
import { useThemeController } from "../constants/Themed";
import { PostHomeProps, SectionDataPostProps } from "../interface/Props.interface";
import { PubRes } from "../interface/Pub.interface";
import { UserRes } from "../interface/User.interface";
import { profileStyle, rootStyle, rowstyle, text } from "../style";
import { colors } from "../style/Colors";
import { LoadProfilePost } from "./LoadContent";
import { ReactButtonsPost } from "./ReactButtonsPost";
import { ImageProfileComponent, ProdLight, ProdRegular, ScrollToTopButtonComponent, TruncatedTextBold } from "./StyledComponents";
import ZoomableImage from "./modal/ViewImageModal";
import { RefreshControl } from "react-native-gesture-handler";

const PostHome: React.FC = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const { t } = useTranslation();
    const [sectionData, setSectionData] = useState<SectionDataPostProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [noMorePost, setNoMorePost] = useState(false);
    const source = axios.CancelToken.source();
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    const _getPostsById = useCallback(async (pageNumber: number) => {
        setTimeout(async () => {
            try {
                const data = await getSecureStoreData();
                if (!data) console.warn('sem dados storage = ' + data)
                const getPostsData = await axios.get<PubRes[]>(`${API_URL}/posts?page=${pageNumber}`, {
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
                setSectionData(sections);
                setPage(pageNumber + 1);
                console.warn(usersData);
            } catch (error: any) {
                console.error('Busca pelso post na home deu ruim', error);
                // return error.message;
            }
            finally {
                console.warn('loading falso')
                setLoading(false);
            }
        }, 100)

    }, []);
    

    const _onDimensionsChange = () => {
        setScreenHeight(Dimensions.get('window').height);
        Dimensions.addEventListener('change', _onDimensionsChange);
    };

    useEffect(() => {
        if (loading) _getPostsById(page);
        _onDimensionsChange();
        return () => {
            source.cancel();
        };
    }, [_getPostsById, page]);

    const _timeLinePub = ({ item }: { item: { post: PubRes; user: UserRes } }) => {
        const [isViewVisible, setIsViewVisible] = useState(false);
        const [imageUri, setImageUri] = useState(item.post.photo);
        const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
        const position = new Animated.ValueXY({ x: -50, y: 85 });
        const [modalVisible, setModalVisible] = useState(false);

        const panResponderSettingsPopUp = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => { position.setValue({ x: gesture.dx - 50, y: gesture.dy + 85 }); },
            onPanResponderRelease: (_, gesture) => {
                if (isViewVisible && gesture.dx === -50 && gesture.dy === 85) setIsViewVisible(false); else Animated.spring(position, { toValue: { x: -50, y: 85 }, useNativeDriver: false }).start();
            },
        });
        const fadeInOut = (visible: boolean) => { setModalVisible(visible); };
        const animatedStyle = { transform: [{ translateX: position.x }, { translateY: position.y }], };


        useEffect(() => {
            if (imageUri && imageUri !== "string") Image.getSize(imageUri, (width, height) => { setImageDimensions({ width, height }) });
        }, [imageUri]);
        return (
            <View style={[rootStyle.w100, rootStyle.pt2, { flex: 1, position: 'relative' }]}>
                <View style={[rowstyle.row, rootStyle.px1, { backgroundColor: 'transparent', position: 'relative' }]}>
                    <View style={[rowstyle["1col"], rootStyle.centralize, rootStyle.maxW50, { backgroundColor: 'transparent' }]}>
                        <ImageProfileComponent source={{ uri: item.user?.photo }} />
                    </View>
                    <View style={[rowstyle["6col"], rootStyle.pl1, rootStyle.justifyCenter, {}]}>
                        <View style={[rowstyle.row, { position: 'relative' }]}>
                            <View style={[rowstyle["1col"], rowstyle.row, rootStyle.alignCenter, {}]}>
                                <TruncatedTextBold content={String(item.user?.username)} maxSize={20} style={[text.fz17, text.leftText, { color: themeBWI, }]} />
                                <SvgXml xml={verifiedAccount} style={[rootStyle.iconVerified, rootStyle.ml1, {}]} />
                            </View>
                        </View>
                        <ProdLight style={[text.fz10, { color: themeDG }]}>
                            {format(new Date(item.post?.createdAt), 'dd•MMM yyyy-HH:mm',)}
                        </ProdLight>
                    </View>
                    <View style={[rowstyle["2col"], rowstyle.row, rootStyle.justifyEnd, rootStyle.alignCenter, { backgroundColor: 'transparent' }]}>
                        <Button style={[rowstyle.row, rootStyle.centralize, rootStyle.br100, rootStyle.py3, rootStyle.px4, rootStyle.mx2, { backgroundColor: themeWIB, borderColor: themeTDG, borderWidth: 1 }]}>
                            <ProdLight style={[text.fz15, { color: themeTDWI }]} >{t('profile.follow')} </ProdLight>
                        </Button>
                        <TouchableOpacity onPress={() => setIsViewVisible(!isViewVisible)} style={[rootStyle.br100, rootStyle.p2, { backgroundColor: 'transparent' }]}>
                            <Icon name={"ellipsis-horizontal-outline"} size={24} color={themeTDWI} />
                        </TouchableOpacity>
                        {isViewVisible && (
                            <Animated.View {...panResponderSettingsPopUp.panHandlers} style={[rootStyle.Pabsolute, rootStyle.z10, animatedStyle, { borderRadius: 100, }]}>
                                <BlurView
                                    // tint={'dark'}
                                    style={[profileStyle.settingspopup, rootStyle.z10, {}]}
                                    intensity={150}>
                                    <Text>Width: {imageDimensions.width}</Text>
                                    <Text>Height: {imageDimensions.height}</Text>
                                </BlurView>
                            </Animated.View>
                        )}
                    </View>
                </View>
                <View style={[rootStyle.w100, { flex: 1, }]}>
                    {item.post.content && (
                        <View style={[rootStyle.w100, rootStyle.p1, rootStyle.z_1, { flexDirection: 'row', flexWrap: 'wrap', }]}>
                            <ProdRegular style={[{ color: themeBWI }]}>{item.post.content}</ProdRegular>
                        </View>
                    )}
                    {item.post.photo && (
                        <View style={[rootStyle.justifyCenter, rootStyle.w100, rootStyle.z_1, { flex: 1, backgroundColor: 'blue' }]}>
                            <TouchableWithoutFeedback onPress={() => fadeInOut(true)}>
                                <ImageBackground
                                    resizeMode="cover"
                                    style={[{
                                        width: '100%',
                                        backgroundColor: 'red',
                                        height: imageDimensions.height * 0.3,
                                        maxHeight: screenHeight * 0.7
                                    }]}
                                    source={{ uri: item.post.photo }} />
                            </TouchableWithoutFeedback >
                        </View>
                    )}
                    <ReactButtonsPost />
                </View>
                <Modal visible={modalVisible} transparent statusBarTranslucent={true}>
                    <ZoomableImage uri={item.post.photo} fadeInOut={fadeInOut} onClose={() => setModalVisible(false)} />
                </Modal>
            </View>
        );
    }

    const renderSkeleton = () => {
        return (
            <View>
                <LoadProfilePost
                    showLoad={!loading}
                />
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
                            <View style={[rootStyle.w100, rootStyle.centralize, {}]}>
                                <ScrollToTopButtonComponent onPress={() => {setLoading(true); setTimeout(() => {setLoading(false)},100)}} scrollViewRef={scrollViewRef} />
                            </View>
                        )}
                    </>
                )}
            </View>
        )
    }

    const _handleCheckEndPage = () => { if (loading) _getPostsById(page); };


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            style={[rootStyle.view, { backgroundColor: themeWIB }]}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => { _getPostsById(page) }}
                    tintColor="#007AFF"
                    titleColor="#007AFF"
                    progressViewOffset={0}
                    colors={['#007AFF']}
                    progressBackgroundColor="#F8F8F8"
                />}>
            {loading ? (
                renderSkeleton()
            ) : (
                <SectionList

                    sections={sectionData as any}
                    renderItem={_timeLinePub}
                    // ListHeaderComponent={() => { return <ProdBold>sss</ProdBold> }}
                    keyExtractor={(item, index) => item.post._id.toString()}
                    // keyExtractor={(item: PubRes, index) => `${item._id.toString()}_${index}`}
                    onEndReached={_handleCheckEndPage}
                    // ItemSeparatorComponent={() => { return <View style={[rootStyle.w100, { height: 1, backgroundColor: colors.textDark }]} /> }}
                    onEndReachedThreshold={0.1}
                    // onRefresh={_refreshMorePub}
                    ListEmptyComponent={<ActivityIndicator />}
                    // stickyHeaderIndices={[0]}
                    ListFooterComponent={_refreshMorePub}
                />
            )}
            <Status />
        </ScrollView>
    );
}

export default PostHome;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible', // Adicione esta linha
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    draggable: {

        position: 'absolute',
        backgroundColor: 'red',
        padding: 20,
        zIndex: 10,
        borderRadius: 10,
    },
    draggableText: {
        color: 'white',
    },
});

{/* <Icon size={30} name={"ellipsis-horizontal-circle-outline"} /> */ }


{/* <Icon size={30} name={"fast-food-outline"} /> */ }


{/* <Icon size={30} name={"female"} />
                             */}

{/* <Icon size={30} name={"finger-print-outline"} /> */ }



{/* <Icon size={30} name={"flower-outline"} /> */ }


{/* <Icon size={30} name={"gift"} /> */ }

{/* <Icon size={30} name={"gift-outline"} /> */ }