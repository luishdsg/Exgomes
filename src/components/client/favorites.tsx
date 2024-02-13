// src/pages/home.tsx
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, RefreshControl, SectionList, View } from 'react-native';
import { PostRes } from '../../base/Post.base';
import { UserRes } from "../../base/User.base";
import { ProdBold, ProdLight } from '../StyledComponents';
import PostBody from '../app/TimeLine';
import getSecureStoreData from '../../constants/SecureStore';
import { FavoritesScreenProps, SectionDataTimeLineProps } from '../../interface/Props.interface';
import { postById } from '../../services/post.service';
import { favoritesList, userById, userByUsername } from '../../services/user.service';
import { rootStyle, rowstyle, text } from '../../style';
import { colors } from '../../style/Colors';
import { useThemeController } from '../../style/Themed';



const FavoritesScreen: React.FC<FavoritesScreenProps> = ({navigation, onLoad }) => {
  const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeBTD, themeBW, themeGTD, themeTDWO, themeWIB, themeStatus, Status, _toggleTheme } = useThemeController();
  const { t } = useTranslation();
  const SectionListRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sectionData, setSectionData] = useState<SectionDataTimeLineProps[]>([]);
  const [page, setPage] = useState(1);

  const _getFavoritesPosts = useCallback(async (pageNumber: number) => {
    try {
      const data = await getSecureStoreData();
      if (!data) console.warn('sem token FavoritesScreen = ' + data.token);
      const listFavites = await favoritesList(data.Id, pageNumber);
      if (!listFavites) console.warn('sem favoritesList = ' + listFavites);
      // Get favorite posts
      const favoritedPostsList = await Promise.all(
        listFavites.map(async (ids) => {
          const favoritePostData = await postById(ids);
          return favoritePostData;
        }));
      // get only userId of posts
      const userIds = favoritedPostsList.map((post) => post.userId);
      // get all usuers by id from listId of favorites
      const favoritedUsersList = await Promise.all(
        userIds.map(async (userId: string) => {
          const usersData = await userById(userId);
          return usersData;
        }));

      const favoritesUsersMap = favoritedUsersList.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {} as Record<string, UserRes>);

      // estruturaction
      const section = Object.values(favoritesUsersMap)
        .filter((user) => !data?.Blocked.includes(user._id))
        .map((user) => {
          const userPosts = favoritedPostsList
            .filter((post) => post.userId === user._id)
            .map((post) => ({ post, user }));
          return {
            title: user.username,
            data: userPosts,
          };
        });
      // invertion
      const invertedSections = section.slice().reverse().map((section) => ({
        ...section,
        title: section.title,
        data: section.data.slice().reverse(),
      }));
      setSectionData(invertedSections);
      // setPage(pageNumber + 1);
      const userAuth = await userByUsername(data.Username)
      await SecureStore.setItemAsync('userAuthorizeBlocked', JSON.stringify(userAuth.block));
      await SecureStore.setItemAsync('userAuthorizeFollowing', JSON.stringify(userAuth.following));
      await SecureStore.setItemAsync('userAuthorizeHated', JSON.stringify(userAuth.hated));
      await SecureStore.setItemAsync('userAuthorizeFavorites', JSON.stringify(userAuth.favorites));
      await SecureStore.setItemAsync('userAuthorizeFollowers', JSON.stringify(userAuth.followers));
      await SecureStore.setItemAsync('userAuthorizePhoto', JSON.stringify(userAuth.photo));
      await SecureStore.setItemAsync('userAuthorizeSaved', JSON.stringify(userAuth.saved));
      await SecureStore.setItemAsync('userAuthorizeLocal', JSON.stringify(userAuth.local));
      await SecureStore.setItemAsync('userAuthorizeUsername', JSON.stringify(userAuth.username));
    } catch (err) {
      console.error('get block error = ' + err)
    }
    finally {
      console.warn('listou! = ' + loading + page)
      setLoading(false);
    }
  }, []);


  const _timeLine = ({ item }: { item: { post: PostRes; user: UserRes } }) => {
    const _handleunfollowList = (_handleunfollowList: React.SetStateAction<SectionDataTimeLineProps[]>) => { setSectionData(_handleunfollowList), _getFavoritesPosts(page) };
    return (
      <PostBody
        item={item}
        unfollowList={_handleunfollowList}
        unSaveList={() => { }}
        _refreshPage={() => console.log('era isso')}
      />
    );
  }

  const _listHeaderComponent = () => {
    return (
      <View style={[rowstyle.row, {}]}>
        <ProdBold style={[text.fz20, rootStyle.px2, rootStyle.my2, { color: themeBW }]}>{t('profile.favorites')}</ProdBold>
        <ProdBold style={[text.fz20, rootStyle.my2, { color: themeBW }]}>{sectionData.length}</ProdBold>
      </View>
    );
  }

  const footerList = () => {
    return (
      <View style={[rootStyle.mb9]}></View>
    );
  }

  const onEndReached = async () => {
    const sectionLength = sectionData.map(item => item.data.map(post => post.post))
    if (sectionLength.length >= 10) {
      _getFavoritesPosts(page);
    }
  };

  const emptyList = () => {
    return (
      <View style={[rootStyle.container, rootStyle.centralize, { backgroundColor: 'transparent' }]}>
        <LottieView
          loop={true}
          autoPlay
          duration={3000}
          style={[
            {
              width: 140 * 0.7,
              height: 140 * 0.7,
            }]}
          source={require('../../../assets/json/heart.json')}
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
      if (onLoad) await _getFavoritesPosts(page)
    }
    data()
  }, [page]);


  return (
    <View style={[rootStyle.container, {}]}>
      {loading ? (
        <View style={[rootStyle.w100, rootStyle.centralize, { height: screenHeight * .5, backgroundColor: 'transparent' }]}>
          <ActivityIndicator size="large" color={colors.patternColor} />
        </View>
      ) : (
        <SectionList
          ref={SectionListRef}
          sections={sectionData as any}
          keyExtractor={(item, index) => item.post._id.toString()}
          renderItem={_timeLine}
          ListHeaderComponent={_listHeaderComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={footerList}
          ListEmptyComponent={emptyList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { _getFavoritesPosts(page); }}
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
    </View>

  );
};

export default FavoritesScreen;

