// src/pages/home.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button, StatusBar, View } from 'react-native';
import { useAuth } from '../auth/services/AuthService';
import { ProdBold} from '../components/StyledComponents';
import { useThemeController } from '../constants/Themed';
import { Rowstyle, rootStyle } from '../style';

type HomeScreenPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenPageProps> = ({ navigation }) => {
  const handleLogout = async () => {
  };
  const { onLogout } = useAuth();
  const { themeText, themeView, themeTitle, toggleTheme } = useThemeController();

  return (
    <View style={[ themeView, rootStyle.centralize, Rowstyle['1col'] ]}>
      <ProdBold>HELLO WORLD!</ProdBold>
      <Button onPress={onLogout} title="SIgn Out" />
    </View>
  );
};

export default HomeScreen;
