import { API_URL } from '@env';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View, useColorScheme } from 'react-native';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
import { ImageMinComponent, ProdBold, ProdRegular, ProdThin } from '../components/StyledComponents';
import getSecureStoreData from '../constants/SecureStore';
import { UserRes } from '../interface/User.interface';
import { Rowstyle, profileStyle, rootStyle, text } from '../style';
import Colors from '../style/Colors';


const ProfileScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes | null>(null);
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const colorThemePolar = Colors[colorScheme ?? 'dark'].writeTheme;
  const colorThemeSomeWhat = Colors[colorScheme ?? 'dark'].text;

  useEffect(() => {
    const getUserAuthorizeData = async () => {
      try {
        const data = await getSecureStoreData();
        if (data) {
          console.log(data?.username + 'os nomes')

          const getUserData = await axios.get<UserRes>(`${API_URL}/users/${data?.username}`);

          setUserSecureStoreData(getUserData.data);
          console.log(getUserData.data.photo + 'os dados')
        }
      } catch (error: any) {
        console.log('   <   deu riom ')
        return error.message;
      }
    };
    getUserAuthorizeData();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={rootStyle.view}>
      <View style={[Rowstyle.app]}>
        <View style={[Rowstyle.row, rootStyle.px1, rootStyle.container]}>
          <View style={[Rowstyle[`2col`], rootStyle.justifyCenter,]}>
            <ImageMinComponent source={{ uri: userSecureStoreData?.photo }} />
          </View>
          <View style={[Rowstyle[`4col`], rootStyle.justifyCenter]}>
            <View style={[Rowstyle.col, rootStyle.h50]}>
              <View style={[Rowstyle[`1col`], rootStyle.justifyCenter]}>
                <ProdBold style={[text.fz25, text.leftText,]}>{userSecureStoreData?.username}</ProdBold>
                <View style={[Rowstyle.row, rootStyle.h20]}>
                  <ProdRegular style={[text.fz15, text.leftText,]}>@{userSecureStoreData?.email || `${t('profile.youremail')}`}</ProdRegular>
                  <ProdRegular style={[rootStyle.px1]}>•</ProdRegular>
                  <ProdThin style={[rootStyle.px1]}>{t('profile.editprofile')}</ProdThin>
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
              <Pressable style={[
                Rowstyle.row,
                profileStyle.pressableBtn,
                rootStyle.centralize,
                { backgroundColor: colorThemeSomeWhat },
              ]}>
                {({ pressed }) => (
                  <>
                    <MaterialCommunityIcons name={pressed ? 'tree' : 'tree-outline'} size={20}
                      color={colorThemePolar}
                      style={[{ opacity: pressed ? 0.5 : 1 }]}
                    />
                    <ProdRegular style={[text.fz15, { opacity: pressed ? 0.5 : 1 }]}>  {t('profile.start')}</ProdRegular>
                  </>
                )}
              </Pressable>
              {/* Followers */}
              <Pressable style={[
                Rowstyle.row,
                profileStyle.pressableBtn,
                rootStyle.centralize,
                { backgroundColor: colorThemeSomeWhat },
              ]}>
                {({ pressed }) => (
                  <>
                    <ProdBold style={[text.fz20, { opacity: pressed ? 0.5 : 1 }]}>220</ProdBold>
                    <ProdRegular style={[text.fz15, { opacity: pressed ? 0.5 : 1 }]}>  {t('profile.followers')}</ProdRegular>
                  </>
                )}
              </Pressable>
              {/* Following */}
              <Pressable style={[
                Rowstyle.row,
                profileStyle.pressableBtn,
                rootStyle.centralize,
                { backgroundColor: colorThemeSomeWhat },
              ]}>
                {({ pressed }) => (
                  <>
                    <ProdBold style={[text.fz20, { opacity: pressed ? 0.5 : 1 }]}>220</ProdBold>

                    <ProdRegular style={[text.fz15, { opacity: pressed ? 0.5 : 1 }]}>  {t('profile.following')}</ProdRegular>
                  </>
                )}
              </Pressable>
              {/* Favorite */}
              <Pressable style={[
                Rowstyle.row,
                profileStyle.pressableBtn,
                rootStyle.centralize,
                { backgroundColor: colorThemeSomeWhat },
              ]}>
                {({ pressed }) => (
                  <>
                    <Ionicons name={pressed ? 'heart-sharp' : 'heart-outline'} size={20}
                      color={colorThemePolar}
                      style={[text.fz15, { opacity: pressed ? 0.5 : 1 }]}
                    />
                    <ProdRegular style={[{ opacity: pressed ? 0.5 : 1 }]}>  {t('profile.favorites')}</ProdRegular>
                  </>
                )}
              </Pressable>
              {/* Save */}
              <Pressable style={[
                Rowstyle.row,
                profileStyle.pressableBtn,
                rootStyle.centralize,
                { backgroundColor: colorThemeSomeWhat },
              ]}>
                {({ pressed }) => (
                  <>
                    <Ionicons name={pressed ? 'bookmark' : 'bookmark-outline'} size={20}
                      color={colorThemePolar}
                      style={[text.fz15, { opacity: pressed ? 0.5 : 1 }]}
                    />
                    <ProdRegular style={[{ opacity: pressed ? 0.5 : 1 }]}>  {t('profile.save')}</ProdRegular>
                  </>
                )}
              </Pressable>
                {/* Media */}
                <Pressable style={[
                Rowstyle.row,
                profileStyle.pressableBtn,
                rootStyle.centralize,
                { backgroundColor: colorThemeSomeWhat },
              ]}>
                {({ pressed }) => (
                  <>
                    <Ionicons name={pressed ? 'image-sharp' : 'image-outline'} size={20}
                      color={colorThemePolar}
                      style={[text.fz15, { opacity: pressed ? 0.5 : 1 }]}
                    />
                    <ProdRegular style={[{ opacity: pressed ? 0.5 : 1 }]}>  {t('profile.media')}</ProdRegular>
                  </>
                )}
              </Pressable>
              {/* Trash */}
              <Pressable style={[
                Rowstyle.row,
                profileStyle.pressableBtn,
                rootStyle.centralize,
                { backgroundColor: colorThemeSomeWhat },
              ]}>
                {({ pressed }) => (
                  <>
                    <Feather name={pressed ? 'trash-2' : 'trash'} size={20}
                      color={colorThemePolar}
                      style={[text.fz15, { opacity: pressed ? 0.5 : 1 }]}
                    />
                    <ProdRegular style={[{ opacity: pressed ? 0.5 : 1 }]}>  {t('profile.trash')}</ProdRegular>
                  </>
                )}
              </Pressable>
               {/* Block */}
               <Pressable style={[
                Rowstyle.row,
                profileStyle.pressableBtn,
                rootStyle.centralize,
                { backgroundColor: colorThemeSomeWhat },
              ]}>
                {({ pressed }) => (
                  <>
                    <MaterialCommunityIcons name="block-helper" size={20}
                      color={colorThemePolar}
                      style={[text.fz15, { opacity: pressed ? 0.5 : 1 }]}
                    />
                    <ProdRegular style={[{ opacity: pressed ? 0.5 : 1 }]}>  {t('profile.block')}</ProdRegular>
                  </>
                )}
              </Pressable>
            </View>
          </GestureScrollView>
        </View>

      </View>
    </ScrollView>
  )
}

export default ProfileScreen;