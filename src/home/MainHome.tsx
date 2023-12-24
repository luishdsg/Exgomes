// src/pages/home.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../pages/home';
type HomeScreenPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const Tab = createBottomTabNavigator();
  const AppTabs = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      </Tab.Navigator>
      
    );
  };
const MainHome: React.FC = () => {

  return (
    <AppTabs />
  );
};

export default MainHome;
