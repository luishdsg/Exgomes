/* eslint-disable react-native/no-inline-styles */

import { API_URL } from "@env";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Animated, Modal, Image, Text, PanResponder, SectionList, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ImageBackground, Dimensions } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import getSecureStoreData from "../constants/SecureStore";
import { useThemeController } from "../constants/Themed";
import { ProfileViewsProps } from "../interface/Props.interface";
import { PubRes } from "../interface/Pub.interface";
import { RootStackParamList } from "../interface/RootStackParamList";
import { UserRes } from "../interface/User.interface";
import { profileStyle, rootStyle, rowstyle, text } from "../style";
import { colors } from "../style/Colors";
import { ImageProfileComponent, ProdBold, ProdLight, ProdRegular, ProdThin, TruncatedTextBold } from "./StyledComponents";
import ZoomableImage from "./modal/ViewImageModal";
import { BlurView } from "expo-blur";
import { Button } from "react-native-ios-kit";
import { Icon } from 'react-native-ios-kit';
import { SvgXml } from 'react-native-svg';
import { verifiedAccount } from "../../assets/svg/IconsSVG";
import { ReactButtonsPost } from "./ReactButtonsPost";
import { LoadProfilePost } from "./LoadContent";

type ScreenPageProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ProfileViews'>;
};
const ProfileViews: React.FC<ProfileViewsProps> = ({ user }) => {
    const { t, i18n: { changeLanguage, language } } = useTranslation();
    const [pubUserData, setPubUserData] = useState<PubRes[]>([]);
    const [page, setPage] = useState(1);
    const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes>();
    const [loading, setLoading] = useState(true);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

    const [selectedDropDownPost, setSelectedDropDownPost] = useState('1');
    const source = axios.CancelToken.source();
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    const _getPostsById = useCallback(async (pageNumber: number) => {
        try {
            const data = await getSecureStoreData();

            if (!data) {
                console.error('Dados do usuário não encontrados');
                return;
            }

            const getPostsData = await axios.get<PubRes[]>(`${API_URL}/posts/findByIdUser/${user?._id}?page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${data?.token}`,
                },
                cancelToken: source.token,

            });

            setPubUserData((prevData) => [...prevData, ...getPostsData.data]);
            setPage(pageNumber + 1);

            const getUserData = await axios.get<UserRes>(`${API_URL}/users/byId/${user?._id}`);

            setUserSecureStoreData(getUserData.data);
            if (!userSecureStoreData) {
                console.error(userSecureStoreData + '<<<  os dados do usuaro NOT FOUND')
            }
        } catch (error: any) {
            console.error(pubUserData, + ' <<< os dados dos posts NOT FOUND')
            console.error(userSecureStoreData + '<<<  os dados do usuaro NOT FOUND')
            console.error('Erro ao buscar dados do post:', error);
            return error.message;
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    const _onDimensionsChange = () => {
        setScreenHeight(Dimensions.get('window').height);
        Dimensions.addEventListener('change', _onDimensionsChange);
    };


    useEffect(() => {
        _getPostsById(page);
        _onDimensionsChange();
        return () => {
            source.cancel();
        };
    }, [_getPostsById, page]);


    const _timeLinePub = ({ item }: { item: PubRes }) => {
        const [isViewVisible, setIsViewVisible] = useState(false);
        const [imageUri, setImageUri] = useState(item?.photo);
        const [imageLoaded, setImageLoaded] = useState(false);
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
            if (imageLoaded) {
            Image.getSize(
                imageUri,
                (width, height) => {
                  setImageDimensions({ width, height});
                },
                (error) => {
                  console.warn(`Failed to get size for image: ${imageDimensions}`);
                }
                );
              }
            }, [imageUri, imageLoaded]);
        return (
            <View style={[rootStyle.w100, rootStyle.pt2, { flex: 1, position: 'relative' }]}>
                <View style={[rowstyle.row, rootStyle.px1, { backgroundColor: 'transparent', position: 'relative' }]}>
                    <View style={[rowstyle["1col"], rootStyle.centralize, rootStyle.maxW50, { backgroundColor: 'transparent' }]}>
                        <ImageProfileComponent source={{ uri: userSecureStoreData?.photo }} />
                    </View>
                    <View style={[rowstyle["6col"], rootStyle.pl1,rootStyle.justifyCenter, {}]}>
                        <View style={[rowstyle.row, { position: 'relative' }]}>
                            <View style={[rowstyle["1col"], rowstyle.row, rootStyle.alignCenter, {}]}>
                                <TruncatedTextBold content={String(userSecureStoreData?.username)} maxSize={20} style={[text.fz17, text.leftText, { color: themeBWI, }]} />
                                <SvgXml xml={verifiedAccount} style={[rootStyle.iconVerified, rootStyle.ml1, {}]} />
                            </View>
                        </View>
                        <ProdLight style={[text.fz10, { color: themeDG }]}>
                            {format(new Date(item.createdAt), 'dd•MMM yyyy-HH:mm',)}
                        </ProdLight>
                    </View>
                    <View style={[rowstyle["2col"], rowstyle.row, rootStyle.justifyEnd, rootStyle.alignCenter, { backgroundColor: 'transparent' }]}>
                        <Button style={[rowstyle.row, rootStyle.centralize, rootStyle.br100, rootStyle.px3, rootStyle.py2, rootStyle.mx2, { backgroundColor: themeWIB, borderColor: themeTDG, borderWidth: 1 }]}>
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
                                    {/* <Text>Width: {imageDimensions.width}</Text>
                                    <Text>Height: {imageDimensions.height}</Text> */}
                                </BlurView>
                            </Animated.View>
                        )}
                    </View>
                </View>
                <View style={[rootStyle.w100, { flex: 1, }]}>
                    {item.content && (
                        <View style={[rootStyle.w100, rootStyle.p1, rootStyle.z_1, { flexDirection: 'row', flexWrap: 'wrap', }]}>
                            <ProdRegular style={[{ color: themeBWI }]}>{item.content}</ProdRegular>
                        </View>
                    )}
                    {item.photo && (
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
                                    source={{ uri: item?.photo }}
                                    onLoad={() => setImageLoaded(true)} />
                            </TouchableWithoutFeedback >
                        </View>
                    )}
                    {/* <ReactButtonsPost /> */}
                </View>
                <Modal visible={modalVisible} transparent statusBarTranslucent={true}>
                    {/* <StatusBar hidden={true} /> */}
                    <ZoomableImage uri={item?.photo} fadeInOut={fadeInOut} onClose={() => setModalVisible(false)} />
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

    const _refreshMorePub = () => { return loading ? <ActivityIndicator size="large" color={colors.patternColor} /> : null; };
    const _handleCheckEndPage = () => { if (!loading) _getPostsById(page); };


    return (
        <View
            style={[rootStyle.view, { overflow: 'visible' }]}>
            {loading ? (
                renderSkeleton()
            ) : (
                <SectionList
                    sections={[{ data: pubUserData, title: 'Posts' }]}
                    renderItem={_timeLinePub}
                    // ListHeaderComponent={_timeLinePub}
                    keyExtractor={(item: PubRes, index) => `${item._id.toString()}_${index}`}
                    onEndReached={_handleCheckEndPage}
                    // ItemSeparatorComponent={() => { return <View style={[rootStyle.w100, { height: 1, backgroundColor: colors.textDark }]} /> }}
                    onEndReachedThreshold={0.5}
                    // onRefresh={onRefresh}
                    ListEmptyComponent={<ActivityIndicator />}
                    // stickyHeaderIndices={[0]}
                    ListFooterComponent={_refreshMorePub}
                />

            )}
        </View>

    );
}

export default ProfileViews;


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