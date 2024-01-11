// src/pages/home.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, RefreshControl, ScrollView, StatusBar, View } from 'react-native';
import { useAuth } from '../auth/services/AuthService';
import { ProdBold } from '../components/StyledComponents';
import { useThemeController } from '../constants/Themed';
import { rowstyle, rootStyle } from '../style';
import getSecureStoreData from '../constants/SecureStore';
import * as Haptics from 'expo-haptics';
import axios from 'axios';
import { UserRes } from '../interface/User.interface';
import { API_URL } from '@env';
import { RootStackParamList } from '../interface/RootStackParamList';

type HomeScreenPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenPageProps> = ({ navigation }) => {
  const handleLogout = async () => {
  };
  const { onLogout } = useAuth();
  const { themeWB, themeWTD, themeGTD,themeBWI ,themeBW,themeWIB , themeWITD,themeDGL , themePG,  Status, _toggleTheme } = useThemeController();
  const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes | null>(null);
  const [refreshing, setRefreshing] = useState(false);
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
        console.log(getUserData.data.photo + 'os dados')
      }
    } catch (error: any) {
      console.log('   <   deu riom ')
      return error.message;
    }
    vibrate();
  };
  const vibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
      style={[rootStyle.view, {backgroundColor: themeWIB}]}>
      <View style={[rowstyle.app, rootStyle.centralize]}>

        <ProdBold style={[{color: themeBWI}]}>HELLO WORLD!</ProdBold>
        <Button onPress={onLogout} title="SIgn Out" />
      </View>
      <Status/>

    </ScrollView>

  );
};

export default HomeScreen;
