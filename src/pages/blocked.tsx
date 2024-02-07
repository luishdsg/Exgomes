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
import { UserRes } from "../base/User.base";
import { LoadBlocked } from '../components/LoadContent';
import { ImageProfileComponent, ProdBold, ProdRegular, TruncatedTextBold } from '../components/StyledComponents';
import getSecureStoreData from '../constants/SecureStore';
import { blockUser, getBlockUser, userById } from '../services/user.service';
import { animate1500ms } from '../shared/animations/animations';
import { rootStyle, rowstyle, text } from '../style';
import { colors } from '../style/Colors';
import { useThemeController } from '../style/Themed';



const BlockedScreen: React.FC = () => {
  const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeBTD, themeBW, themeGTD, themeTDWO, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
  const SectionListRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sectionData, setSectionData] = useState<UserRes[]>([]);

  const animeShared300 = useSharedValue(-300);
  const animeShared0 = useSharedValue(0);



  const _getUserAuth = useCallback(async () => {
    try {
      const data = await getSecureStoreData();
      if (data) console.warn('sem token BlockedScreen = ' + data.token);
      const listBlocked = await getBlockUser(data?.userAuth?._id);
      if (listBlocked) console.warn('sem BlockedList = ' + listBlocked.data);
      const userDetailPromises = listBlocked.data.map(async (id) => {
        try {
          const blockData = await userById(id);
          console.warn('id? = ' + id);
          return blockData;
        } catch (error) {
          console.error(`Erro ao obter detalhes do usuário ${id}:`, error);
        }
      });
      if (userDetailPromises) console.warn('sem userDetailPromises = ' + userDetailPromises);

      const userDetails = await Promise.all(userDetailPromises);

      console.log(userDetailPromises + ' e e ' + userDetails)
      setSectionData(userDetails);
    } catch (err) {
      console.error('get block error = ' + err)
    }
    finally {
      console.warn('block falso')
      setLoading(false);
    }
  }, []);


  const AnimeBottomOp = useAnimatedStyle(() => {
    return {
      bottom: withTiming(animeShared300.value, animate1500ms),
      opacity: withTiming(animeShared0.value, animate1500ms),
    };
  });


  const deleteItemList = (_id: string) => { setSectionData((prevData) => prevData.filter((item) => item._id !== _id)); };



  const TimeLine = ({ item }: { item: UserRes }) => {
    const translateX = useSharedValue(0);
    
    const _unBlock = async () => {
      const data = await getSecureStoreData();
      translateX.value = withTiming(-500, { duration: 700, easing: Easing.ease });
      setTimeout(() => {deleteItemList(item._id);}, 700);
      await blockUser(data?.userAuth?._id, item?._id, false)
    };
    const animeLeft = useAnimatedStyle(() => { return { transform: [{ translateX: translateX.value }], }; });

    return (
      <Animated.View style={[rootStyle.w100, rootStyle.br30, AnimeBottomOp, animeLeft, { bottom: -300, }]}>
        <View style={[rowstyle.row, rootStyle.py2, rootStyle.mx1, rootStyle.px1, rootStyle.borderTop, { borderColor: themeBTD, backgroundColor: 'transparent' }]}>
          <View style={[rowstyle["2col"], rootStyle.centralize, rootStyle.maxW50, rootStyle.op5, { backgroundColor: 'transparent' }]}>
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
            <TouchableOpacity onPress={_unBlock} style={[rootStyle.px3, rootStyle.py4, rootStyle.br30, { borderWidth: 1, borderColor: colors.red }]}>
              <ProdRegular style={[text.centralizeText, { color: themeBWI }]}>{t('settings.unblock')}</ProdRegular>
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



  useEffect(() => {
    _getUserAuth();
    animeShared300.value = 0;
    animeShared0.value = 1;
  }, [])
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
          // keyExtractor={(item: PostRes, index) => `${item._id.toString()}_${index}`}
          // onEndReached={_handleCheckEndPage}
          onEndReachedThreshold={0.1}
          // onRefresh={_refreshMorePub}
          ListEmptyComponent={<ActivityIndicator size="large" color={colors.patternColor} />}
          // ListFooterComponent={_refreshMorePub}
          // stickyHeaderIndices={[0]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { _getUserAuth; }}
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

