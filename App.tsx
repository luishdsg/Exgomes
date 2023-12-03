import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './src/auth/signup';
import LoginScreen from './src/auth/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/home';

type HomeScreenParams = {
  userId: string; 
};

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: HomeScreenParams; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
