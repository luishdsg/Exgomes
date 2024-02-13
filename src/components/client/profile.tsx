/* eslint-disable react-native/no-inline-styles */

import { Feather, Ionicons, MaterialCommunityIcons, } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, RefreshControl, Text, View } from 'react-native';
import { ScrollView as GestureScrollView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ImageMinComponent, MenuOptionProfile, ProdBold, ProdRegular, ProdThin } from '../StyledComponents';
import getSecureStoreData from '../../constants/SecureStore';
import { storeProps } from '../../interface/Props.interface';
import { Images, rootStyle, rowstyle, text } from '../../style';
import { colors } from '../../style/Colors';
import { useThemeController } from '../../style/Themed';
import ProfileViews from './home';
import BlockedScreen from './blockeds';
import FavoritesScreen from './favorites';
import { useFadeAnimation } from '../../shared/animations/animations';


const ProfileScreen: React.FC = () => {
  const viewRef = useRef<View>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPage, setSelectedPage] = useState(8);
  const [userSecureStoreData, setUserSecureStoreData] = useState<storeProps>(null);
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const { themeGLTD, themeWTD, themeTDG, themeBWI, themeTDW, themeWIB, themeBW, themeTDGT, themeGTD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
  const [infoSectionProfile, setInfoSectionProfile] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const { fadeHide: fadeHide, fadeInHide: fadeInAnime, fadeOutHide: fadeOutAnime } = useFadeAnimation();

  const getUserAuthorizeData = async () => {
    try {
      const data = await getSecureStoreData();
      if (data) setUserSecureStoreData(data);
    } catch (error: any) {
      console.log('sem dados do usuario posthome')
      return error.message;
    }
  };
  const renderContent = () => {
    switch (selectedPage) {
      case 1:
        return (
          <ProfileViews
            user={userSecureStoreData}
          />
        );
      case 2:
        return (
          <Text>2</Text>

        );
      case 3:
        return (
          <Text>3</Text>

        );
      case 4:
        return (

          <FavoritesScreen onLoad={onLoad} />
        );
      case 5:
        return (
          <Text>um</Text>

        );
      case 6:
        return (
          <Text>um</Text>

        );
      case 7:
        return (
          <Text>um</Text>

        );
      case 8:
        return (
          <BlockedScreen />
        );
      default:
        return null;
    }
  };
  const _handleLayoutInfoSection = () => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get('window').height;
        const isVisibleNow = pageY < 0 || pageY + height > screenHeight;
        setInfoSectionProfile(isVisibleNow);
        _handleVisibilityInfoSection(isVisibleNow);
      });
    }
  };
  const _handleScrollInfoSection = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const isVisibleNow = offsetY < 0 || offsetY > 0;
    setInfoSectionProfile(isVisibleNow);
  };
  const _handleVisibilityInfoSection = (visible: boolean) => {
    if (visible) {
      console.log('amor');
    }
  };
  const _handleGestureScrollView = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    if (scrollX > 30) fadeOutAnime()
    else if (scrollX <= 30)  fadeInAnime()
  };
  useEffect(() => {
    getUserAuthorizeData();
    setSelectedPage(1)
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onScroll={_handleScrollInfoSection}
      scrollEventThrottle={0}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getUserAuthorizeData}
          tintColor="#007AFF"
          title="Atualizando..."
          titleColor="#007AFF"
          progressViewOffset={0}
          colors={['#007AFF']}
          progressBackgroundColor="#F8F8F8"
        />
      }
      style={[rootStyle.view, , { backgroundColor: themeWIB }]}>
      <View
        ref={viewRef}
        onLayout={_handleLayoutInfoSection}
        style={[rowstyle.app]}>
        <View style={[rowstyle.row, rootStyle.px1, rootStyle.container]}>
          <View style={[rowstyle[`2col`], rootStyle.justifyCenter, rootStyle.maxW100, {}]}>
            <ImageMinComponent source={{ uri: userSecureStoreData?.Photo }} />
          </View>
          <View style={[rowstyle[`4col`], rootStyle.justifyCenter, rootStyle.px1, []]}>
            <View style={[rowstyle.col, rootStyle.h50]}>
              <View style={[rowstyle[`1col`], rootStyle.justifyCenter]}>
                <ProdBold style={[text.fz25, text.leftText, { color: themeBWI }]}>{userSecureStoreData?.Username}</ProdBold>
                <View style={[rowstyle.row, rootStyle.h20]}>
                  <ProdRegular style={[text.fz15, text.leftText, { color: themeTDG }]}>@{userSecureStoreData?.Email || `${t('profile.youremail')}`}</ProdRegular>
                  <ProdRegular style={[rootStyle.px1, { color: themeTDG }]}>•</ProdRegular>
                  <ProdThin style={[rootStyle.px1, { color: themeTDG }]}>{t('profile.editprofile')}</ProdThin>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[rootStyle.h60, rootStyle.px1, { backgroundColor: 'transparent' }]}>
          {/* Arrow indication */}
          <Animated.View style={[Images.PostProfileIco, rootStyle.centralize, rootStyle.Pabsolute, rootStyle.z10, { opacity: fadeHide, top: -40, right: '10%', backgroundColor: themeGTD }]} >
            <Ionicons name="arrow-forward" size={25} style={[{ top: 1, }]} color={themeBWI} />
          </Animated.View>
          <GestureScrollView style={[{ backgroundColor: 'transparent' }]}
            onScroll={(event) => _handleGestureScrollView(event)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} horizontal>
            <View style={[rowstyle.row, rootStyle.h60, { backgroundColor: 'transparent' }]}>
              {/* Start */}
              <MenuOptionProfile>
                <TouchableOpacity onPress={() => { setSelectedPage(1) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 1 ? colors.gray : themeWTD, borderWidth: 2 }]}>
                  <MaterialCommunityIcons name={selectedPage == 1 ? 'tree' : 'tree-outline'} size={21}
                    color={themeTDW}
                  />
                  <ProdRegular style={[text.fz15, { color: themeTDGT }]}>  {t('profile.start')}</ProdRegular>
                </TouchableOpacity>
              </MenuOptionProfile>
              {/* Followers */}
              <MenuOptionProfile>
                <TouchableOpacity onPress={() => { setSelectedPage(2) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 2 ? colors.gray : themeWTD, borderWidth: 2 }]}>
                  <ProdBold style={[text.fz20, text.centralizeText, { color: themeBW, }]}>220</ProdBold>
                  <ProdRegular style={[text.fz15, text.centralizeText, { marginTop: 2, color: themeTDGT, }]}>  {t('profile.followers')}</ProdRegular>
                </TouchableOpacity>
              </MenuOptionProfile>
              {/* Following */}
              <MenuOptionProfile>
                <TouchableOpacity onPress={() => { setSelectedPage(3) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 3 ? colors.gray : themeWTD, borderWidth: 2 }]}>
                  <ProdBold style={[text.fz20, text.centralizeText, { color: themeBW, }]}>220</ProdBold>
                  <ProdRegular style={[text.fz15, text.centralizeText, { marginTop: 2, color: themeTDGT, }]}>  {t('profile.following')}</ProdRegular>
                </TouchableOpacity>
              </MenuOptionProfile>
              {/* Favorite */}
              <MenuOptionProfile>
                <TouchableOpacity onPress={() => { setSelectedPage(4), setOnLoad(true) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 4 ? colors.gray : themeWTD, borderWidth: 2 }]}>
                  <Ionicons name={selectedPage == 4 ? 'heart' : 'heart-outline'} size={21}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.favorites')}</ProdRegular>
                </TouchableOpacity>
              </MenuOptionProfile>
              {/* Save */}
              <MenuOptionProfile>
                <TouchableOpacity onPress={() => { setSelectedPage(5) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 5 ? colors.gray : themeWTD, borderWidth: 2 }]}>
                  <Ionicons name={selectedPage == 5 ? 'bookmark' : 'bookmark-outline'} size={21}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.save')}</ProdRegular>
                </TouchableOpacity>
              </MenuOptionProfile>
              {/* Media */}
              <MenuOptionProfile>
                <TouchableOpacity onPress={() => { setSelectedPage(6) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 6 ? colors.gray : themeWTD, borderWidth: 2 }]}>
                  <Ionicons name={selectedPage == 6 ? 'images' : 'images-outline'} size={21}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.media')}</ProdRegular>
                </TouchableOpacity>
              </MenuOptionProfile>
              {/* Trash */}
              <MenuOptionProfile>
                <TouchableOpacity onPress={() => { setSelectedPage(7) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 7 ? colors.gray : themeWTD, borderWidth: 2 }]}>
                  <Feather name={selectedPage == 7 ? 'trash-2' : 'trash'} size={21}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.trash')}</ProdRegular>
                </TouchableOpacity>
              </MenuOptionProfile>
              {/* Block */}
              <MenuOptionProfile>
                <TouchableOpacity onPress={() => { setSelectedPage(8) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 8 ? colors.gray : themeWTD, borderWidth: 2 }]}>
                  <MaterialCommunityIcons name={selectedPage == 8 ? 'block-helper' : 'panorama-fisheye'} size={21}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.block')}</ProdRegular>
                </TouchableOpacity>
              </MenuOptionProfile>
            </View>
          </GestureScrollView>
        </View>
      </View>
      {renderContent()}

      {/* {selectedPage == 1 ? (
        <ProfileViews
          user={userSecureStoreData}
        />) : (
        <></>
      )} */}
      <Status />
    </ScrollView>


  )
}
export default ProfileScreen;