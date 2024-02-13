// src/pages/home.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, RefreshControl, SectionList, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { UserRes } from "../../base/User.base";
import LottieView from 'lottie-react-native';
import { LoadBlocked } from '../LoadContent';
import { ImageProfileComponent, ProdBold, ProdLight, ProdRegular, TruncatedTextBold } from '../StyledComponents';
import getSecureStoreData from '../../constants/SecureStore';
import { blockedUsers, userById } from '../../services/user.service';
import { animate1500ms } from '../../shared/animations/animations';
import { rootStyle, rowstyle, text } from '../../style';
import { colors } from '../../style/Colors';
import { useThemeController } from '../../style/Themed';
import { blockUser } from '../../services/post.service';



const BlockedScreen: React.FC = () => {
  const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeBTD, themeBW, themeGTD, themeTDWO, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
  const SectionListRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [sectionData, setSectionData] = useState<UserRes[]>([]);

  const animeShared300 = useSharedValue(-300);
  const animeShared0 = useSharedValue(0);



  const _getBlockedUsers = useCallback(async () => {
    setTimeout(async () => {
      try {
        const data = await getSecureStoreData();
        if (!data) console.warn('sem token BlockedScreen = ' + data.token);
        const listBlocked = await blockedUsers(data.Id);
        const userDetailPromises = listBlocked.map(async (id) => {
          try {
            const blockData = await userById(id);
            return blockData;
          } catch (error) {
            console.error(`Erro ao obter detalhes do usuário ${id}:`, error);
          }
        });
        const userDetails = await Promise.all(userDetailPromises);
        setSectionData(userDetails);
      } catch (err) {
        console.error('get block error = ' + err)
      }
      finally {
        console.warn('block falso')
        setLoading(false);
      }
    }, 500)

  }, []);

  const AnimeBottomOp = useAnimatedStyle(() => {
    return {
      bottom: withTiming(animeShared300.value, animate1500ms),
      opacity: withTiming(animeShared0.value, animate1500ms),
    };
  });

  const TimeLine = ({ item }: { item: UserRes }) => {
    const translateX = useSharedValue(0);

    const _unBlock = async () => {
      const data = await getSecureStoreData();
      translateX.value = withTiming(-500, { duration: 500, easing: Easing.ease });
      setTimeout(() => { deleteItemList(item._id); }, 500);
      await blockUser(data?.Id, item?._id, false)
    };
    const animeLeft = useAnimatedStyle(() => { return { transform: [{ translateX: translateX.value }], }; });

    return (
      <Animated.View style={[rootStyle.w100, rootStyle.br30, AnimeBottomOp, animeLeft, { bottom: -300, }]}>
        <View style={[rowstyle.row, rootStyle.py2, rootStyle.mx1, rootStyle.px1, rootStyle.borderTop, { borderColor: themeGTD, backgroundColor: 'transparent' }]}>
          <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50, { backgroundColor: 'transparent' }]}>
            <ImageProfileComponent source={{ uri: item?.photo }} />
          </View>
          <View style={[rowstyle["6col"], rootStyle.justifyCenter, {}]}>
            <View style={[rowstyle.row, { position: 'relative' }]}>
              <View style={[rowstyle["1col"], rowstyle.row, rootStyle.alignCenter, {}]}>
                <TruncatedTextBold content={String(item?.username)} maxSize={20} style={[text.fz17, text.leftText, { color: themeBWI, }]} />
              </View>
            </View>
          </View>
          <View style={[rowstyle["4col"], rootStyle.justifyCenter, { backgroundColor: 'transparent' }]}>
            <TouchableOpacity onPress={_unBlock} style={[rootStyle.px3, rootStyle.py4, rootStyle.br30, { borderWidth: 2, borderColor: colors.red }]}>
              <ProdBold style={[text.centralizeText, { color: themeBWI }]}>{t('settings.unblock')}</ProdBold>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

  const _listHeaderComponent = ({ item }: { item: UserRes }) => {
    return (
      <View style={[rowstyle.row, {}]}>
        <ProdBold style={[text.fz20, rootStyle.px2, rootStyle.my2, { color: themeBW }]}>{t('profile.block')}</ProdBold>
        <ProdBold style={[text.fz20, rootStyle.my2, { color: themeBW }]}>{sectionData.length}</ProdBold>
      </View>
    );
  }

  const footerList = () => {
    return (
      <View style={[rootStyle.mb9]}></View>
    );
  }

  const deleteItemList = (_id: string) => { setSectionData((prevData) => prevData.filter((item) => item._id !== _id)); };
  const onEndReached = async () => { if (sectionData.length >= 10) _getBlockedUsers(); };

  const emptyList = () => {
    return (
      <View style={[rootStyle.container, rootStyle.centralize, { backgroundColor: 'red' }]}>
        <LottieView
          loop={true}
          autoPlay
          duration={2000}
          style={[
            {
              width: 140 * 0.7,
              height: 140 * 0.7,
            }]}
          source={require('../../../assets/json/block.json')}
        />
        <ProdBold style={[rootStyle.w100, rootStyle.mt02, text.centralizeText, text.fz15, { color: themeBW }]}>
          {t('profile.favoritesEmpty')}
        </ProdBold>
        <ProdLight style={[rootStyle.w100, rootStyle.mt01, text.centralizeText, text.fz13, { color: themeGTD }]}>
          {t('profile.favoritesEmpty2')}
        </ProdLight>
      </View>
    );
  };



  useEffect(() => {
    const data = async () => {
      if (loading) {
        await _getBlockedUsers();
      };
    }
    data()
    animeShared300.value = 0;
    animeShared0.value = 1;
  }, [_getBlockedUsers])
  return (
    <>
      {loading ? (
        <View style={[rootStyle.w100, rootStyle.centralize, { height: screenHeight * .5, backgroundColor: 'transparent' }]}>
          <ActivityIndicator size="large" color={colors.patternColor} />
        </View>
      ) : (
        <SectionList
          ref={SectionListRef}
          sections={[{ data: sectionData, title: 'Block' }]}
          keyExtractor={(item, index) => item._id}
          renderItem={TimeLine}
          ListHeaderComponent={_listHeaderComponent}
          // onEndReached={_handleCheckEndPage}
          // onEndReachedThreshold={0.1}
          // onRefresh={_refreshMorePub}
          ListEmptyComponent={emptyList}
          ListFooterComponent={footerList}
          // stickyHeaderIndices={[0]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { _getBlockedUsers }}
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
};

export default BlockedScreen;

