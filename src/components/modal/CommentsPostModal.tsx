import axios from "axios";
import { ptBR } from 'date-fns/locale';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState, } from "react";
import { ActivityIndicator, Animated, Dimensions, Easing, Modal, PanResponder, RefreshControl, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { verifiedAccount } from "../../../assets/svg/IconsSVG";
import { useThemeController } from "../../constants/Themed";
import { CommentsPostProps, UserComments } from "../../interface/Props.interface";
import { Commentaries, PubRes } from "../../interface/Pub.interface";
import { UserRes } from "../../interface/User.interface";
import { rootStyle, rowstyle, text } from "../../style";
import { colors } from "../../style/Colors";
import { ImageUserCommentComponent, LineiOSComponent, ProdLight, ProdRegular, TruncatedTextRegular } from "../StyledComponents";
import { API_URL } from "@env";
import { formatDistanceToNow } from "date-fns";
import { convertCreatedAt } from "../../pipe/FormatDate";

const CommentsPostModal: React.FC<CommentsPostProps> = ({ post, onClose }) => {
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWD, themeBW, themeGTD, themeGLD, themeWID, themeStatus, Status, _toggleTheme } = useThemeController();

    const screenHeight = Dimensions.get('window').height;
    const screen90Percent = screenHeight * 0.9;

    const emptyAnimation = useRef<LottieView | null>(null);
    const SectionListRef = useRef(null);
    const translateY = useRef(new Animated.Value(-200)).current;


    const [modalHeight, setModalHeight] = useState(screenHeight * 0.6);
    const [modalOpacity] = useState(new Animated.Value(0));


    const [animatedModalHeight] = useState(new Animated.Value(0));
    const animatedModalBottom = useRef(new Animated.Value(-modalHeight)).current;

    const [section, setSection] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [animatedCloseModal, setAnimatedCloseModal] = useState(true);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                const newHeight = modalHeight - gestureState.dy;
                if (newHeight >= screenHeight * 0.3 && newHeight <= screen90Percent) {
                    setModalHeight(newHeight);
                    // animatedModalHeight.setValue(newHeight);
                } else if (newHeight < screenHeight * 0.9) {
                    Animated.timing(animatedModalHeight, {
                        toValue: -screenHeight,
                        duration: 2000,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }).start();
                    setTimeout(() => {
                        onClose();
                    }, 2000)

                }
            },
            onPanResponderRelease: (_, gestureState) => {
                // Animated.timing(animatedModalHeight, {
                //     toValue: modalHeight + (gestureState.dy > 0 ? 5 : -5),
                //     duration: 200,
                //     easing: Easing.linear,
                //     useNativeDriver: false,
                // }).start();
            },
        })
    ).current;

    const _close = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const threshold = 1;
        if (offsetY < threshold) {
            setAnimatedCloseModal(false)
        } else {
            setAnimatedCloseModal(true)
        }
        // onClose();
    }


    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: animatedModalHeight } } }],
        { useNativeDriver: false, listener: _close }
    );

    const _getUserDetails = useCallback(async () => {
        try {
            const userIds = post.comments.map((post) => post.userId)
            const usersData = await Promise.all(
                userIds.map(async (userId) => {
                    const userData = await axios.get<UserComments>(`${API_URL}/users/forComments/${userId}`);
                    return userData.data;
                })
            );
            const usersMap = usersData.reduce((acc, user) => {
                acc[user._id] = user;
                return acc;
            }, {} as Record<string, UserRes>);

            const sections = Object.values(usersMap).map((user) => {
                const userComments = post.comments
                    .filter((comment) => comment.userId === user._id)
                    .map((comment) => ({ post, user, comment }));
                return {
                    title: user.username,
                    data: userComments,
                };
            });
            setSection(sections);
        } catch (error) {
            console.error('Erro ao obter detalhes:', error);
        }
    }, []);

    const _timeLine = ({ item }: { item: { post: PubRes; user: UserRes, comment: Commentaries } }) => {
        return (
            <View style={[rootStyle.w100, rootStyle.pt3, { backgroundColor: 'transparent', flex: 1, position: 'relative' }]}>
                <View style={[rowstyle.row, rootStyle.px1, { backgroundColor: 'transparent', position: 'relative' }]}>
                    <View style={[rowstyle["1col"], rootStyle.centralize, rootStyle.maxW50, { backgroundColor: 'transparent' }]}>
                        <View style={[rootStyle.br100, rootStyle.Pabsolute, rootStyle.z10, { top: -2, left: -1, backgroundColor: themeWB, }]}>
                            {!item.user?.verified && <SvgXml xml={verifiedAccount} style={[rootStyle.iconVerified, { transform: [{ scale: 0.8, }], }]} />}
                        </View>
                        <ImageUserCommentComponent source={{ uri: item.user?.photo }} />
                    </View>
                    <View style={[rowstyle["7col"], rootStyle.justifyCenter, { backgroundColor: 'transparent' }]}>
                        <View style={[rowstyle.row, { position: 'relative' }]}>
                            <View style={[rowstyle["1col"], rowstyle.row, rootStyle.alignCenter, {}]}>
                                <TruncatedTextRegular content={String(`@${item.user?.username}`)} maxSize={25} style={[text.fz12, text.leftText, { color: themeGTD, }]} />
                                <ProdLight style={[text.fz13, rootStyle.ml1, { color: themeGTD }]}>•&nbsp;&nbsp;{convertCreatedAt(item.comment?.createdAt)}</ProdLight>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[rootStyle.w100, { flex: 1, }]}>
                    {item.post.content && (
                        <View style={[rootStyle.w100, rootStyle.py1, rootStyle.px2, rootStyle.z_1, { flexDirection: 'row', flexWrap: 'wrap', }]}>
                            <ProdRegular style={[text.fz17, { color: themeBW }]}>{item.comment?.content}</ProdRegular>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    const _Empty = () => {
        return (
            <View style={[rootStyle.w100, rootStyle.centralize, {}]}>
                <LottieView
                    loop={false}
                    autoPlay
                    duration={1800}
                    ref={emptyAnimation}
                    style={[
                        {
                            width: 150 * 0.7,
                            height: 150 * 0.7,
                        }]}
                    source={require('../../../assets/json/empty.json')}
                />
            </View>

        );
    }

    useEffect(() => {
        _getUserDetails();
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
    }, [
        modalHeight,
        post
    ]);


    return (
        <Modal transparent visible={true} animationType="fade">
            <View style={[rootStyle.view, { backgroundColor: colors.blackOp }]}>
                <Animated.View style={[rootStyle.brTop, rootStyle.Pabsolute, rootStyle.w100, {
                    height: animatedModalHeight.interpolate({
                        inputRange: [0, screenHeight], // 0 a 100 (ajuste conforme necessário)
                        outputRange: ['60%', '100%'], // ajuste conforme necessário
                    }),
                    backgroundColor: themeWD,
                    bottom: animatedModalBottom,
                    opacity: modalOpacity
                }]}>
                    <View   {...panResponder.panHandlers} style={[rootStyle.pt2, rootStyle.z10, rootStyle.w100, {
                        position: animatedCloseModal ? 'relative' : 'absolute',
                        height: animatedCloseModal ? '0%' : '100%',
                        backgroundColor: animatedCloseModal ? 'red' : 'green',
                    }]}>
                        <LineiOSComponent />
                    </View>
                    <SectionList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ref={SectionListRef}
                        sections={section as any}
                        onScroll={handleScroll}
                        renderItem={_timeLine}
                        // ListHeaderComponent={_refreshMorePub}
                        keyExtractor={(item, index) => item.comment._id.toString()}
                        // keyExtractor={(item: PubRes, index) => `${item._id.toString()}_${index}`}
                        // onEndReached={_Empty}
                        // onEndReachedThreshold={10}
                        // onRefresh={_refreshMorePub}
                        ListEmptyComponent={<ActivityIndicator size="large" color={colors.patternColor} />}
                        ListFooterComponent={_Empty}
                    // stickyHeaderIndices={[0]}
                    />
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <StatusBar />

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgb(40,30,240,220)',
        justifyContent: 'flex-end',
    },
    draggableContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 16,
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    draggableBar: {
        height: 10,
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        marginVertical: 8,
        width: 40,
        borderRadius: 5,
    },
    closeButton: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
});

export {
    CommentsPostModal
};
