// src/pages/home.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button,Text, View } from 'react-native';

type HomeScreenPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenPageProps> = ({ navigation }) => {
  const handleLogout = async () => {
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HELLO WORLD!</Text>
    </View>
  );
};

export default HomeScreen;
