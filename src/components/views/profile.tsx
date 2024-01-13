import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../interface/RootStackParamList";
import { PopUpErrorProps, ProfileViewsProps } from "../../interface/Props.interface";
import { ScrollView } from "react-native-gesture-handler";
import { ProdBold } from "../StyledComponents";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserRes } from "../../interface/User.interface";
import { API_URL } from "@env";
import { PubRes } from "../../interface/Pub.interface";
import { colors } from "../../style/Colors";
import getSecureStoreData from "../../constants/SecureStore";

type ScreenPageProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ProfileViews'>;
};

const ProfileViews: React.FC<ProfileViewsProps> = ({ user }) => {
    const [pubUserData, setPubUserData] = useState<PubRes[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const _getUserData = async (pageNumber: number) => {
        setLoading(true);
        try {
            const data = await getSecureStoreData();
            const getUserData = await axios.get<PubRes[]>(`${API_URL}/posts/findByIdUser/${user?._id}?page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${data?.token}`,
                },
            });
            setPubUserData((prevData) => [...prevData, ...getUserData.data]);
            setPage(pageNumber + 1);
            console.log(getUserData.data + 'os dados')
        } catch (error: any) {
            console.error('Erro ao buscar dados:', error);
            return error.message;
        } finally {
            setLoading(false);
        }
    };

    const _handleCheckEndPage = () => { if (loading) _getUserData(page); };

    useEffect(() => {
        _getUserData(page);
    }, []);

    const _timeLinePub = ({ item }: { item: PubRes }) => {
        return (
            <View style={[{ height: 20, width: '100%', backgroundColor: 'purple' }]}>
                <ProdBold>{item.content}</ProdBold>
            </View>
        );
    }
    const _refreshMorePub = () => {
        return loading ? <ActivityIndicator size="large" color={colors.patternColor} /> : null;
    };
    return (
        <FlatList
            data={pubUserData}
            renderItem={_timeLinePub}
            keyExtractor={(item) => item._id.toString()}
            onEndReached={_handleCheckEndPage}
            onEndReachedThreshold={0.1}
            ListFooterComponent={_refreshMorePub}
        />
    );
}

export default ProfileViews;