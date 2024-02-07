// src/pages/home.tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import PostHome from '../views/PostHome';
import { HomeScreenPageProps } from '../interface/Props.interface';



const HomeScreen: React.FC<HomeScreenPageProps> = ({ navigation }) => {

  return (
    <View>
        <PostHome/>
    </View>

  );
};

export default HomeScreen;
