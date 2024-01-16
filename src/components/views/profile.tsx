import { API_URL } from "@env";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Animated, Modal, Image, PanResponder, SectionList, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import getSecureStoreData from "../../constants/SecureStore";
import { useThemeController } from "../../constants/Themed";
import { ProfileViewsProps } from "../../interface/Props.interface";
import { PubRes } from "../../interface/Pub.interface";
import { RootStackParamList } from "../../interface/RootStackParamList";
import { UserRes } from "../../interface/User.interface";
import { rootStyle, rowstyle, text } from "../../style";
import { colors } from "../../style/Colors";
import { ImageProfileComponent, ProdBold, ProdLight, ProdRegular, TruncatedTextBold } from "../StyledComponents";
import ZoomableImage from "../modal/ViewImageModal";

type ScreenPageProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ProfileViews'>;
};
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const ProfileViews: React.FC<ProfileViewsProps> = ({ user }) => {
    const { t, i18n: { changeLanguage, language } } = useTranslation();
    const [pubUserData, setPubUserData] = useState<PubRes[]>([]);
    const [page, setPage] = useState(1);
    const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes>();
    const [loading, setLoading] = useState(true);

    const [selectedDropDownPost, setSelectedDropDownPost] = useState('1');
    const source = axios.CancelToken.source();
    const { themeWB, themeWTD, themeTDG, themeBWI, themeDG, themeWIB, themeBW, themeTDGT, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    const _getPostsById = useCallback(async (pageNumber: number) => {
        try {
            setLoading(true);
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


    useEffect(() => {
        _getPostsById(page);
        return () => {
            source.cancel();
        };
    }, [_getPostsById, page]);


    const _timeLinePub = ({ item }: { item: PubRes }) => {
        const [isViewVisible, setIsViewVisible] = useState(false);
        const position = new Animated.ValueXY({ x: 0, y: 0 });
        const [modalVisible, setModalVisible] = useState(false);

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (_, gesture) => {
                if (isViewVisible && gesture.dx === 0 && gesture.dy === 0) {
                    setIsViewVisible(false);
                } else {
                    Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
                }
            },
        });


        const animatedStyle = {
            transform: [{ translateX: position.x }, { translateY: position.y }],
        };




        return (
            <View style={[rootStyle.w100, { flex: 1, backgroundColor: 'red', position: 'relative' }]}>
                <View style={[rowstyle.row, { position: 'relative' }]}>
                    <View style={[rowstyle["1col"], rootStyle.centralize, { backgroundColor: 'blue' }]}>
                        <ImageProfileComponent source={{ uri: userSecureStoreData?.photo }} />
                    </View>
                    <View style={[rowstyle["4col"], rootStyle.justifyCenter, { backgroundColor: 'purple' }]}>
                        <TruncatedTextBold content={String(userSecureStoreData?.username)} maxSize={20} style={[text.fz17, text.leftText, { color: themeBWI, backgroundColor: 'green' }]} />
                        <ProdLight style={[text.fz10, { color: themeDG }]}>
                            {format(new Date(item.createdAt), 'dd•MMM yyyy-HH:mm',)}
                        </ProdLight>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => setIsViewVisible(!isViewVisible)} style={styles.button}>
                            <ProdLight style={styles.buttonText}>Toggle View</ProdLight>
                        </TouchableOpacity>

                        {isViewVisible && (
                            <Animated.View {...panResponder.panHandlers} style={[styles.draggable, animatedStyle]}>
                                <ProdLight style={styles.draggableText}>Drag me!</ProdLight>
                            </Animated.View>
                        )}
                    </View>

                </View>
                <View style={[rootStyle.w100, { flex: 1, backgroundColor: 'orange' }]}>
                    {item.content && (
                        <View style={[rootStyle.w100, rootStyle.px1, { backgroundColor: 'aqua' }]}>
                            <ProdRegular style={[{}]}>{item.content}</ProdRegular>
                        </View>
                    )}
                    {item.photo && (
                        <View style={[rootStyle.justifyStart, rootStyle.w100, { flex: 1, backgroundColor: 'orange' }]}>
                            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                                <Image
                                    resizeMode="contain"
                                    style={[{
                                        width: '100%',
                                        maxHeight: 400,
                                        minHeight: 200,
                                        backgroundColor: 'black',
                                    }]}
                                    source={{ uri: item.photo }} />
                            </TouchableWithoutFeedback >
                        </View>
                    )}


                </View>
                <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
                    <StatusBar hidden={true} />
                    <ZoomableImage uri={item.photo} onClose={() => setModalVisible(false)} />
                </Modal>
                {/* <ImageMaxComponent source={{ uri: item.photo }} /> */}
            </View>
        );
    }
    const renderSkeleton = () => {
        return (
            <View>
                {/* <ShimmerPlaceholder /> */}
                <ShimmerPlaceholder visible={!loading}>
                    <ProdBold>
                        Wow, awesome here.
                    </ProdBold>
                </ShimmerPlaceholder>

            </View>
        );
    }

    const _refreshMorePub = () => {
        return loading ? <ActivityIndicator size="large" color={colors.patternColor} /> : null;
    };

    const _handleCheckEndPage = () => { if (loading) _getPostsById(page); };


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
                    // onEndReached={_handleCheckEndPage}
                    // ItemSeparatorComponent={() => { return <View style={[rootStyle.w100, { height: 1, backgroundColor: colors.textDark }]} /> }}
                    onEndReachedThreshold={0.5}
                    // onRefresh={onRefresh}
                    // ListEmptyComponent={<ActivityIndicator />}
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