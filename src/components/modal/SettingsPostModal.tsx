import { SettingsPostModalProps, UserAuth } from "../../interface/Props.interface";
import { rootStyle, rowstyle, text } from "../../style";
import { BlurView } from "expo-blur";
import { colors } from "../../style/Colors";
import { LineiOSComponent, ProdBold, ProdLight, ProdRegular } from "../StyledComponents";
import { useThemeController } from "../../style/Themed";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Animated, Dimensions, Easing, FlatList, PanResponder, Platform, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Button, Icon } from "react-native-ios-kit";
import { HateIcon, Uninteresting } from "../../../assets/svg/IconsSVG";
import { formatNumber } from "../../pipe/FormatNumber";
import { blockUser, userByUsername } from "../../services/user.service";
import { UserRes } from "../../base/User.base";
import getSecureStoreData from "../../constants/SecureStore";

const SettingsPostModal: React.FC<SettingsPostModalProps> = ({ onClose, author, userAuth, isUserFollowing, followUnfollow, post }) => {
    const { themeWB, themeWID, themeGLD, themeTDG, themeBWI, themeFollow, themeWIB, themeBW, themeGTD, themeTDWI, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
    const { t } = useTranslation();
    const screenHeight = Dimensions.get('window').height;

    const [notify, setNotify] = useState(false);
    const [unBlockBlock, setUnBlockBlock] = useState(false);
    const [unfollowFollow, setUnfollowFollow] = useState(isUserFollowing);

    const animateOptions = useRef(new Animated.Value(screenHeight)).current;
    const [modalOpacity] = useState(new Animated.Value(0));

    const _notify = () => {
        setNotify(!notify)
    }
 
    const _block = async () => {
        if (unBlockBlock) blockUser(userAuth?._id, author?._id, false), setUnBlockBlock(!unBlockBlock)
        else blockUser(userAuth?._id, author?._id, true), setUnBlockBlock(!unBlockBlock)
    }
    const _verifyBlock = () => { if (userAuth?.block?.includes(author?._id)) setUnBlockBlock(true) }


    const _UnFollow = () => {
        setUnfollowFollow(!unfollowFollow)
        followUnfollow();
    }

    const _close = () => {
        Animated.timing(animateOptions, {
            toValue: screenHeight,
            duration: 200,
            useNativeDriver: false,
        }).start();
        setTimeout(() => {
            onClose();
        }, 200)
    }

    useEffect(() => {
        Animated.timing(modalOpacity, {
            toValue: 1,
            easing: Easing.linear,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(animateOptions, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
        _verifyBlock();
    }, []);

    console.log('number of views: ' + typeof post.views)
    return (
        <BlurView intensity={50} tint="dark" style={[rootStyle.view]}>
            <Animated.View
                style={[
                    rootStyle.justifyEnd,
                    rootStyle.w100,
                    {
                        flex: 1,
                        opacity: modalOpacity,
                    }]}>
                <Button onPress={onClose} style={[rootStyle.w100, { flex: 1 }]}></Button>
                <Animated.View
                    style={[rootStyle.boxShadow, rootStyle.brTop, rootStyle.pt2, rootStyle.px2, rootStyle.w100, rootStyle.maxW500, rootStyle.maxH500, {
                        transform: [{ translateY: animateOptions }],
                        backgroundColor: themeWIB
                    }]}>
                    <LineiOSComponent />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={[rootStyle.w100, rootStyle.br30, rootStyle.overflowH, rootStyle.mb3, rootStyle.mt02, {
                            backgroundColor: themeGLD
                        }]}>
                        {/* report */}
                        <TouchableOpacity onPress={_close}
                            style={[rowstyle.row, rootStyle.my1, rootStyle.alignCenter, rootStyle.justifyStart, rootStyle.brTop, rootStyle.pt2, rootStyle.px3, {
                            }]}>
                            <Icon
                                name={'skull-outline'}
                                size={25}
                                color={themeTDG}
                            />
                            <ProdRegular style={[text.fz20, rootStyle.px1, { color: themeTDG, }]}>
                                {t(`settings.report`)}
                            </ProdRegular>
                        </TouchableOpacity>
                        {/* uninteresting */}

                        <TouchableOpacity onPress={_close}
                            style={[rowstyle.row, rootStyle.my1, rootStyle.alignCenter, rootStyle.justifyStart, rootStyle.borderTop, rootStyle.pt2, rootStyle.px3, {
                                borderColor: themeGTD,
                            }]}>
                            <Uninteresting color={themeTDG} />
                            <ProdRegular style={[text.fz20, rootStyle.px1, { color: themeTDG, }]}>
                                {t(`settings.uninteresting`)}
                            </ProdRegular>
                        </TouchableOpacity>
                        {/* notification */}

                        <TouchableOpacity onPress={_notify}
                            style={[rootStyle.mt1, rootStyle.overflowH, rootStyle.borderTop, rootStyle.justifyStart, rootStyle.py2, rootStyle.px3, {
                                borderColor: themeGTD,
                            }]}>
                            <View style={[rowstyle.row, rootStyle.justifyStart, {}]}>
                                <Icon
                                    name={'notifications-outline'}
                                    size={25}
                                    color={themeTDG}
                                />
                                <ProdRegular style={[text.fz20, rootStyle.px1, { color: themeTDG, }]}>
                                    {t(`settings.notification`)}
                                </ProdRegular>
                            </View>

                            {/* notification animation*/}
                            {notify &&
                                <View style={[rootStyle.w100, rootStyle.mt02, {}]}>
                                    <TouchableOpacity onPress={followUnfollow}
                                        style={[rootStyle.w100, rowstyle.row, rootStyle.justifyStart, rootStyle.py2, rootStyle.borderTop, { borderColor: themeGTD }]}>
                                        <Icon
                                            name={'notifications'}
                                            size={25}
                                            color={themeTDG}
                                        />
                                        <ProdLight style={[text.fz20, rootStyle.px1, { color: themeTDG, }]}>

                                            {t(`settings.notify`)}
                                        </ProdLight>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={followUnfollow}
                                        style={[rootStyle.w100, rowstyle.row, rootStyle.justifyStart, rootStyle.py2, {}]}>
                                        <Icon
                                            name={'notifications-off-sharp'}
                                            size={25}
                                            color={themeTDG}
                                        />
                                        <ProdLight style={[text.fz20, rootStyle.px1, { color: themeTDG, }]}>

                                            {t(`settings.notnotfy`)}
                                        </ProdLight>
                                    </TouchableOpacity>

                                </View>
                            }

                        </TouchableOpacity>
                        {/* views */}

                        <TouchableOpacity
                            style={[rootStyle.justifyStart, rootStyle.borderTop, rootStyle.py2, rootStyle.px3, {
                                borderColor: themeGTD,
                            }]}>
                            <View style={[rowstyle.row, rootStyle.justifyStart, {}]}>
                                <MaterialCommunityIcons name="google-analytics" size={24} color={themeTDG} />
                                <ProdBold style={[text.fz20, rootStyle.px1, { color: themeBW, }]}>
                                    {formatNumber(post?.views, t)}
                                </ProdBold>
                                <ProdLight style={[text.fz20, { color: themeBW, }]}>
                                    {t(`settings.views`)}
                                </ProdLight>
                            </View>
                        </TouchableOpacity>
                        {/* block */}
                        <TouchableOpacity onPress={_block}
                            style={[rowstyle.row, , rootStyle.alignCenter, rootStyle.justifyStart, rootStyle.borderTop, rootStyle.py2, rootStyle.px3, {
                                borderColor: themeGTD,
                            }]}>
                            <MaterialIcons name="block" size={24} color={unBlockBlock ? colors.red : themeTDG} />
                            <ProdRegular style={[text.fz20, rootStyle.px1, { color: unBlockBlock ? colors.red : themeTDG }]}>
                                {unBlockBlock ? t(`settings.unblock`) : t(`settings.block`)}
                            </ProdRegular>
                        </TouchableOpacity>
                    </ScrollView>

                    {/* unfollow/follow */}

                    <TouchableOpacity onPress={_UnFollow}
                        style={[rowstyle.row, rootStyle.mb1, rootStyle.centralize, rootStyle.br30, rootStyle.py2, rootStyle.px4, {
                            backgroundColor: unfollowFollow ? themeFollow : themeWIB,
                            borderColor: unfollowFollow ? colors.purple : colors.patternColor, borderWidth: 2
                        }]}>
                        <ProdRegular
                            style={[text.fz20, {
                                color: unfollowFollow ? themeBW : colors.patternColor,
                            }]} >
                            {t(`${unfollowFollow ? 'post.unfollow' : 'post.follow'}`)}
                        </ProdRegular>
                    </TouchableOpacity>
                    {/* cancel */}

                    <TouchableOpacity onPress={_close}
                        style={[
                            rowstyle.row,
                            rootStyle.mb3,
                            Platform.OS === 'ios' && rootStyle.mb5,
                            rootStyle.centralize,
                            rootStyle.br30,
                            rootStyle.py2,
                            rootStyle.px4, {
                                borderWidth: 2,
                                borderColor: colors.red,
                            }]}>
                        <ProdRegular style={[text.fz20, { color: colors.red, }]}>
                            {t(`post.cancel`)}
                        </ProdRegular>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </BlurView>
    );
}
export {
    SettingsPostModal
}



