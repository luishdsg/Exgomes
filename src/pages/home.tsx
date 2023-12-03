import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

type HomeScreenParams = {
  userId: string;
};

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: HomeScreenParams;
};

interface HomeScreenProps {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;



  const handleLogout = async () => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  };

  return (
    <View>
      <Text>Welcome to Home, User ID: {userId}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
