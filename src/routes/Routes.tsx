import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useColorScheme, Image, Text, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '../auth/_layouts/login';
import { AuthProvider, useAuth } from '../auth/services/AuthService';
import '../i18n/i18n';
import ContactsScreen from '../pages/contacts';
import HomeScreen from '../pages/home';
import ProfileScreen from '../pages/profile';
import { Images } from '../style';
import Colors from '../style/Colors';
import { Feather, Octicons } from '@expo/vector-icons';
import getSecureStoreData from '../constants/SecureStore';
import axios from 'axios';
import { API_URL } from '@env';
import { UserRes } from '../interface/User.interface';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function HomeTabBarNavigator() {
  const colorScheme = useColorScheme();
  const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes | null>(null);
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
          console.log( '   <   deu riom ')
        return error.message;
      }
    };
    getUserAuthorizeData();
  }, []);
  const colorTheme = Colors[colorScheme ?? 'light'].text;
  console.log(colorTheme, userSecureStoreData?.photo + 'dhewwedouiduiweh')
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    }} initialRouteName="Feed">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
          headerRight: () => (
            <Pressable>
              {({ pressed }) => (
                <Octicons
                  name="gear"
                  size={25}
                  color={colorTheme}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          headerTitle: () => (
            <Image
              source={
                require('../../assets/logo-black.png')
              }
              style={Images.iconImage}
            />
          )
        }}
        component={HomeScreen} />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) =>   <Image source={{ uri: userSecureStoreData?.photo }} style={Images.iconImage} />
        }}
        component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function LayoutAuth() {
  const { authState, onLogout } = useAuth();
  const colorScheme = useColorScheme();

  SplashScreen.preventAutoHideAsync();
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ProdBold: require('../../assets/fonts/ProductSans-Bold.ttf'),
    ProdLight: require('../../assets/fonts/ProductSans-Light.ttf'),
    ProdRegular: require('../../assets/fonts/ProductSans-Regular.ttf'),
    ProdThin: require('../../assets/fonts/ProductSans-Thin.ttf'),
    ...FontAwesome.font,
  });
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    console.log('sem fonte' + error);
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            {authState?.authenticated ? (
              <>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabBarNavigator} />
                <Stack.Screen name="Contacts" options={{ presentation: 'modal' }} component={ContactsScreen} />
              </>
            ) : (
              <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginPage} />
            )}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>

  );
};


const AppRoutes = () => {
  return (
    <AuthProvider>
      <LayoutAuth />
    </AuthProvider>
  );
};
export default AppRoutes;
