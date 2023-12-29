// src/pages/home.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../pages/home';
import ProfileScreen from '../pages/profile';
const Tab = createBottomTabNavigator();
const AppTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
    </Tab.Navigator>

  );
};
const MainHome: React.FC = () => {

  return (
    <AppTabs />
  );
};

export default MainHome;
