import { API_URL } from '@env';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Animated, Pressable, RefreshControl, ScrollView, View, useColorScheme } from 'react-native';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
import { ImageMinComponent, MenuOptionProfile, ProdBold, ProdRegular, ProdThin } from '../components/StyledComponents';
import getSecureStoreData from '../constants/SecureStore';
import { UserRes } from '../interface/User.interface';
import { Rowstyle, profileStyle, rootStyle, text } from '../style';
import Colors from '../style/Colors';
import { useThemeController } from '../constants/Themed';


const ProfileScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes | null>(null);
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const colorThemePolar = Colors[colorScheme ?? 'dark'].writeTheme;
  const colorThemeSomeWhat = Colors[colorScheme ?? 'dark'].text;
  const { themeWB, themeWTD, themeTDG, themeBWI, themeTDW, themeWIB, themeBW, themeTDGT, themeDGL, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

  useEffect(() => {

    getUserAuthorizeData();
  }, []);
  const getUserAuthorizeData = async () => {
    try {
      const data = await getSecureStoreData();
      if (data) {
        console.log(data?.username + 'os nomes')
        const getUserData = await axios.get<UserRes>(`${API_URL}/users/${data?.username}`);
        setUserSecureStoreData(getUserData.data);
        setRefreshing(false);
        console.log(getUserData.data.photo + 'os dados')
      }
    } catch (error: any) {
      console.log('   <   deu riom ')
      setRefreshing(false);
      return error.message;
    }
  };
  const _handleMenuOptionProfile = async () => {
    setTimeout(() => {
      setIsPressed(false);
    }, 500);
  }
  const scaleValue = useRef(new Animated.Value(1)).current;

  const _handlePressInMenuOption = () => {
    Animated.timing(scaleValue, {
      toValue: 0.7,
      duration: 200, // Duração da animação em milissegundos
      useNativeDriver: true,
    }).start();
  };

  const _handlePressOutMenuOption = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200, // Duração da animação em milissegundos
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
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
      <View style={[Rowstyle.app]}>
        <View style={[Rowstyle.row, rootStyle.px1, rootStyle.container]}>
          <View style={[Rowstyle[`2col`], rootStyle.justifyCenter,]}>
            <ImageMinComponent source={{ uri: userSecureStoreData?.photo }} />
          </View>
          <View style={[Rowstyle[`4col`], rootStyle.justifyCenter]}>
            <View style={[Rowstyle.col, rootStyle.h50]}>
              <View style={[Rowstyle[`1col`], rootStyle.justifyCenter]}>
                <ProdBold style={[text.fz25, text.leftText, { color: themeBWI }]}>{userSecureStoreData?.username}</ProdBold>
                <View style={[Rowstyle.row, rootStyle.h20]}>
                  <ProdRegular style={[text.fz15, text.leftText, { color: themeTDG }]}>@{userSecureStoreData?.email || `${t('profile.youremail')}`}</ProdRegular>
                  <ProdRegular style={[rootStyle.px1, { color: themeTDG }]}>•</ProdRegular>
                  <ProdThin style={[rootStyle.px1, { color: themeTDG }]}>{t('profile.editprofile')}</ProdThin>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[rootStyle.h70, {}]}>
          <GestureScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} horizontal>
            <View style={[Rowstyle.row, rootStyle.h60]}>
              {/* Start */}
              <MenuOptionProfile
                onPressIn={_handlePressInMenuOption}
                onPressOut={_handlePressOutMenuOption}
              >
                <View style={[Rowstyle.row, rootStyle.centralize, {}]}>
                  <MaterialCommunityIcons name='tree-outline' size={23}
                    color={themeTDW}
                  />
                  <ProdRegular style={[text.fz15, { color: themeTDGT }]}>  {t('profile.start')}</ProdRegular>
                </View>
              </MenuOptionProfile>
              {/* Followers */}
              <MenuOptionProfile
                onPressIn={_handlePressInMenuOption}
                onPressOut={_handlePressOutMenuOption}
              >
                <View style={[Rowstyle.row, rootStyle.centralize, {}]}>
                  <ProdBold style={[text.fz20, text.centralizeText, { marginTop: -2, color: themeBW, }]}>220</ProdBold>
                  <ProdRegular style={[text.fz15, text.centralizeText, { color: themeTDGT, }]}>  {t('profile.followers')}</ProdRegular>
                </View>
              </MenuOptionProfile>
              {/* Following */}
              <MenuOptionProfile
                onPressIn={_handlePressInMenuOption}
                onPressOut={_handlePressOutMenuOption}
              >
                <View style={[Rowstyle.row, rootStyle.centralize, {}]}>
                <ProdBold style={[text.fz20, text.centralizeText, { marginTop: -2, color: themeBW, }]}>220</ProdBold>
                  <ProdRegular style={[text.fz15, text.centralizeText,{ color: themeTDGT, }]}>  {t('profile.following')}</ProdRegular>
                </View>
              </MenuOptionProfile>
              {/* Favorite */}
              <MenuOptionProfile
                onPressIn={_handlePressInMenuOption}
                onPressOut={_handlePressOutMenuOption}
              >
                <View style={[Rowstyle.row, rootStyle.centralize, {}]}>
                  <Ionicons name='heart-outline' size={19}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.favorites')}</ProdRegular>
                </View>
              </MenuOptionProfile>
              {/* Save */}
              <MenuOptionProfile
                onPressIn={_handlePressInMenuOption}
                onPressOut={_handlePressOutMenuOption}
              >
                <View style={[Rowstyle.row, rootStyle.centralize, {}]}>
                  <Ionicons name='bookmark-outline' size={19}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.save')}</ProdRegular>
                </View>
              </MenuOptionProfile>
              {/* Media */}
              <MenuOptionProfile
                onPressIn={_handlePressInMenuOption}
                onPressOut={_handlePressOutMenuOption}
              >
                <View style={[Rowstyle.row, rootStyle.centralize, {}]}>
                  <Ionicons name='image-sharp' size={19}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.media')}</ProdRegular>
                </View>
              </MenuOptionProfile>
              {/* Trash */}
              <MenuOptionProfile
                onPressIn={_handlePressInMenuOption}
                onPressOut={_handlePressOutMenuOption}
              >
                <View style={[Rowstyle.row, rootStyle.centralize, {}]}>
                  <Feather name='trash-2' size={19}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.trash')}</ProdRegular>
                </View>
              </MenuOptionProfile>
              {/* Block */}
              <MenuOptionProfile
                onPressIn={_handlePressInMenuOption}
                onPressOut={_handlePressOutMenuOption}
              >
                <View style={[Rowstyle.row, rootStyle.centralize, {}]}>
                  <MaterialCommunityIcons name="block-helper" size={19}
                    color={themeTDW}
                  />
                  <ProdRegular style={[{ color: themeTDGT, }]}>  {t('profile.block')}</ProdRegular>
                </View>
              </MenuOptionProfile>
            </View>
          </GestureScrollView>
        </View>

      </View>
      <Status />
    </ScrollView>
  )
}

export default ProfileScreen;