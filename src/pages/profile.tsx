import { API_URL } from '@env';
import { Feather, Ionicons, MaterialCommunityIcons, } from '@expo/vector-icons';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Animated, Text, Pressable, RefreshControl, ScrollView, View, useColorScheme } from 'react-native';
import { ScrollView as GestureScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ImageMinComponent, MenuOptionProfile, ProdBold, ProdRegular, ProdThin } from '../components/StyledComponents';
import getSecureStoreData from '../constants/SecureStore';
import { UserRes } from '../interface/User.interface';
import { rowstyle, profileStyle, rootStyle, text } from '../style';
import Colors, { colors } from '../style/Colors';
import { useThemeController } from '../constants/Themed';
import ProfileViews from '../components/views/profile';


const ProfileScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  // const [selectedPage, setSelectedPage] = useState(1);
  const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes | null>(null);
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const colorThemePolar = Colors[colorScheme ?? 'dark'].writeTheme;
  const colorThemeSomeWhat = Colors[colorScheme ?? 'dark'].text;
  const { themeWB, themeWTD, themeTDG, themeBWI, themeTDW, themeWIB, themeBW, themeTDGT, themeDGL, themePG, themeStatus, Status, _toggleTheme } = useThemeController();

  useEffect(() => {
    getUserAuthorizeData();
    setSelectedPage(1)
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
          <Text>4</Text>

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
      default:
        return null;
    }
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
      <View style={[rowstyle.app]}>
        <View style={[rowstyle.row, rootStyle.px1, rootStyle.container]}>
          <View style={[rowstyle[`2col`], rootStyle.justifyCenter,]}>
            <ImageMinComponent source={{ uri: userSecureStoreData?.photo }} />
          </View>
          <View style={[rowstyle[`4col`], rootStyle.justifyCenter]}>
            <View style={[rowstyle.col, rootStyle.h50]}>
              <View style={[rowstyle[`1col`], rootStyle.justifyCenter]}>
                <ProdBold style={[text.fz25, text.leftText, { color: themeBWI }]}>{userSecureStoreData?.username}</ProdBold>
                <View style={[rowstyle.row, rootStyle.h20]}>
                  <ProdRegular style={[text.fz15, text.leftText, { color: themeTDG }]}>@{userSecureStoreData?.email || `${t('profile.youremail')}`}</ProdRegular>
                  <ProdRegular style={[rootStyle.px1, { color: themeTDG }]}>•</ProdRegular>
                  <ProdThin style={[rootStyle.px1, { color: themeTDG }]}>{t('profile.editprofile')}</ProdThin>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[rootStyle.h70, {}]}>
          <GestureScrollView style={[rootStyle.mr2]} showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} horizontal>
            <View style={[rowstyle.row, rootStyle.h60]}>
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
                <TouchableOpacity onPress={() => { setSelectedPage(4) }} style={[rowstyle.row, rootStyle.centralize, rootStyle.p10, rootStyle.br100, { height: 45, borderColor: selectedPage == 4 ? colors.gray : themeWTD, borderWidth: 2 }]}>
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
      <View style={[{ backgroundColor: 'red',  flex: 1 }]}>
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
        </View>
      <Status />
    </ScrollView>
  )
}

export default ProfileScreen;