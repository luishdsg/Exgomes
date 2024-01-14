import { API_URL } from "@env";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from 'react-intl';
import { FlatList, View } from "react-native";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import getSecureStoreData from "../../constants/SecureStore";
import { useThemeController } from "../../constants/Themed";
import { ProfileViewsProps } from "../../interface/Props.interface";
import { PubRes } from "../../interface/Pub.interface";
import { RootStackParamList } from "../../interface/RootStackParamList";
import { UserRes } from "../../interface/User.interface";
import { rootStyle, rowstyle, text } from "../../style";
import { colors } from "../../style/Colors";
import { ImageProfileComponent, ProdBold, TruncatedTextBold } from "../StyledComponents";
type ScreenPageProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ProfileViews'>;
};
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const ProfileViews: React.FC<ProfileViewsProps> = ({ user }) => {
    const [pubUserData, setPubUserData] = useState<PubRes[]>([]);
    const [page, setPage] = useState(1);
    const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes>();
    const [loading, setLoading] = useState(false);
    const source = axios.CancelToken.source();
    const { themeWB, themeWTD, themeTDG, themeBWI, themeTDW, themeWIB, themeBW, themeTDGT, themeDGL, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

    const _getPostsById = useCallback(async (pageNumber: number) => {
        // setLoading(true);
        try {
            const data = await getSecureStoreData();
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
            console.log(getUserData.data.photo + '<<<  os dados do usuaro para os posts')
            console.log(pubUserData, + 'os dados dos posts')
        } catch (error: any) {
            console.error('Erro ao buscar dados do post:', error);
            return error.message;
        } finally {
            setLoading(false);
        }
    }, []);

    const _handleCheckEndPage = () => { if (loading) _getPostsById(page); };

    useEffect(() => {
        _getPostsById(page);

        if (!pubUserData.length) {
            setTimeout(() => {
                _getPostsById(page);
            }, 1000);
        }
        return () => {
            source.cancel();
        };
    }, [page, pubUserData]);


    const _timeLinePub = ({ item }: { item: PubRes }) => {
        return (
            <View style={[rootStyle.w100, { maxHeight: 500, backgroundColor: 'red' }]}>
                <View style={[rowstyle.row, {}]}>
                    <View style={[rowstyle["1col"], rootStyle.centralize, { backgroundColor: 'blue' }]}>
                        <ImageProfileComponent source={{ uri: userSecureStoreData?.photo }} />
                    </View>
                    <View style={[rowstyle["4col"], rootStyle.justifyCenter, { backgroundColor: 'purple' }]}>
                        <TruncatedTextBold content={String(userSecureStoreData?.username)} maxSize={20} style={[text.fz17, text.leftText, { color: themeBWI, backgroundColor: 'green' }]} />
                    </View>
                </View>
                <ProdBold>
                    {format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}
                </ProdBold>
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

    // const _refreshMorePub = () => {
    //     return loading ? <ActivityIndicator size="large" color={colors.patternColor} /> : null;
    // };
    return (
        <View
            style={[rootStyle.view, {}]}>
            {loading ? (
                renderSkeleton()
            ) : (
                <FlatList
                    data={pubUserData}
                    renderItem={_timeLinePub}
                    keyExtractor={(item: PubRes, index) => `${item._id.toString()}_${index}`}
                    onEndReached={_handleCheckEndPage}
                    ItemSeparatorComponent={() => { return <View style={[rootStyle.w100, { height: 1, backgroundColor: colors.textDark }]} /> }}
                    onEndReachedThreshold={0.5}
                    // onRefresh={onRefresh}
                // ListEmptyComponent={<ActivityIndicator />}
                // stickyHeaderIndices={[0]}
                // ListFooterComponent={_refreshMorePub}
                />
            )}
        </View>

    );
}

export default ProfileViews;