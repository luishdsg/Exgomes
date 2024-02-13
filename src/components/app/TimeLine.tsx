import { Dimensions, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback, View, Image } from "react-native";
import { TimeLineProps, SectionDataTimeLineProps } from "../../interface/Props.interface";
import { rootStyle, rowstyle, text } from "../../style";
import { useThemeController } from "../../style/Themed";
import { ImageProfileComponent, ProdLight, ProdRegular, TruncatedTextBold } from "../StyledComponents";
import { SvgXml } from "react-native-svg";
import { verifiedAccount } from "../../../assets/svg/IconsSVG";
import { format } from "date-fns";
import { Icon } from "react-native-ios-kit";
import { useEffect, useState } from "react";
import { ReactButtonsPost } from "../ReactButtonsPost";
import ZoomableImage from "../modal/ViewImageModal";
import { SettingsPostModal } from "../modal/SettingsPostModal";
import { followUnfollow, isUserFollowing } from "../../services/user.service";
import { useTranslation } from "react-i18next";
import { convertCreatedAt } from "../../pipe/FormatDate";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { animate1500ms } from "../../shared/animations/animations";

const TimeLine: React.FC<TimeLineProps> = ({ item, _refreshPage, unSaveList, unfollowList }) => {
    const { t } = useTranslation();
    const { themeWB, themeTDG, themeTDWI, themeBWI, themeGLTD, themeBTD, themeBW, themeGTD, themeTDWO, themeWIB, themeStatus, Status, _toggleTheme } = useThemeController();
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [imageUri, setImageUri] = useState(item.post.photo);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const animeShared300 = useSharedValue(-300);
    const animeShared0 = useSharedValue(0);
    const translateX = useSharedValue(0);
    const [modalImage, setModalImage] = useState(false);
    const [modalSettings, setModalSettings] = useState(false);


    const _onDimensionsChange = () => { Dimensions.addEventListener('change', _onDimensionsChange); };

    const AnimeBottomOp = useAnimatedStyle(() => {
        return {
            bottom: withTiming(animeShared300.value, animate1500ms),
            opacity: withTiming(animeShared0.value, animate1500ms),
        };
    });
    const animeLeft = useAnimatedStyle(() => { return { transform: [{ translateX: translateX.value }], }; });

    const removeItemById = (sections: SectionDataTimeLineProps[], postId: string): SectionDataTimeLineProps[] => {
        const updatedSections = sections.map(section => ({
            ...section,
            data: section.data.filter(item => item.post._id !== postId),
        }));
        console.log('óia removeu')
        return updatedSections;
    };

    const deleteItemList = (postId: string) => {
        unfollowList((prevList: SectionDataTimeLineProps[]) => removeItemById(prevList, postId));
    };


    useEffect(() => {
        _onDimensionsChange
        if (imageUri && imageUri !== "string") Image.getSize(imageUri, (width, height) => { setImageDimensions({ width, height }) });
    }, [imageUri]);
    return (
        <View style={[rootStyle.w100, rootStyle.pt2,rootStyle.borderTop, { borderColor: themeGLTD, backgroundColor: themeWIB, flex: 1, position: 'relative' }]}>
            <View style={[rowstyle.row, rootStyle.px2, { backgroundColor: 'transparent', position: 'relative' }]}>
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
                            <ProdLight style={[text.fz13, { color: themeBW }]}>&nbsp;•&nbsp;&nbsp;{t('post.andComment')}&nbsp;{convertCreatedAt(item.post?.createdAt)}</ProdLight>

                        </View>
                    </View>


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
                    <View style={[rootStyle.justifyCenter, rootStyle.w100, rootStyle.px2, rootStyle.z_1, { flex: 1, maxHeight: screenHeight * 0.6, backgroundColor: 'transparent' }]}>
                        <TouchableWithoutFeedback onPress={() => setModalImage(true)}>
                            <ImageBackground
                                resizeMode="cover"
                                style={[
                                    rootStyle.br30,
                                    rootStyle.w100,
                                    rootStyle.overflowH,
                                    {
                                        maxHeight: screenHeight * 0.6,
                                        aspectRatio: imageDimensions.height > screenHeight * 0.6 ? imageDimensions.width > imageDimensions.height ? 16 / 9 : 5 / 8 : 5 / 3,
                                    }]}
                                source={{ uri: item.post?.photo }} />
                        </TouchableWithoutFeedback >
                    </View>
                )}
                <ReactButtonsPost
                    post={item.post}
                    unfollowList={() => { deleteItemList(item.post._id) }}
                    unSaveList={() => { }}
                    onPress={() => { _refreshPage }}
                />
            </View>
            <View style={[rootStyle.w100, { height: 1, backgroundColor: themeTDWO }]} />
            <Modal visible={modalImage} transparent statusBarTranslucent={true}>
                <ZoomableImage uri={item.post.photo} fadeInOut={() => setModalImage(true)} onClose={() => setModalImage(false)} />
            </Modal>
            <Modal visible={modalSettings} transparent statusBarTranslucent={true}>
                <SettingsPostModal
                    post={item.post}
                    author={item.user}
                    isUserFollowing={isUserFollowing(item.user._id)}
                    followUnfollow={() => { followUnfollow(item.user._id), _refreshPage }}
                    onClose={() => { _refreshPage(), setModalSettings(false) }}
                />
            </Modal>
        </View>
    );
}

export default TimeLine