import { API_URL } from '@env';
import { Feather, MaterialIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, View, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '../auth/_layouts/login';
import { AuthProvider, useAuth } from '../auth/services/AuthService';
import { ProdBold, TruncatedTextBold } from '../components/StyledComponents';
import getSecureStoreData from '../constants/SecureStore';
import '../i18n/i18n';
import { UserRes } from '../interface/User.interface';
import ContactsScreen from '../pages/contacts';
import HomeScreen from '../pages/home';
import ProfileScreen from '../pages/profile';
import { Images, Rowstyle, rootStyle, text } from '../style';
import Colors, { colors } from '../style/Colors';
import { useThemeController } from '../constants/Themed';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function HomeTabBarNavigator() {
  const colorScheme = useColorScheme();
  const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes | null>(null);
  const { themeText, themeView, Theme, ThemeStatus, ThemeWD, ThemeColorBWI, themeTitle } = useThemeController();
  const isDarkLogo = ThemeStatus === 'light' ? require('../../assets/logo-white.png') : require('../../assets/logo-black.png');

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
        console.log('   <   deu rium ')
        return error.message;
      }
    };
    getUserAuthorizeData();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: ThemeColorBWI,
          height: 90
        },
        tabBarLabelStyle: { color: ThemeWD },
        tabBarActiveTintColor: colors.patternColor,
      }} initialRouteName="Feed">
      <Tab.Screen
        name="Feed"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <Feather name="home" style={[rootStyle.mt02, {}]} size={30} color={color} />,
          headerRight: () => (
            <Pressable>
              {({ pressed }) => (
                <Octicons
                  name="gear"
                  size={25}
                  themeText
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          headerBackground: () => (
            <View style={[themeView, { flex: 1 }]} />
          ),
          headerTitle: () => (
            <Image
              source={isDarkLogo}
              style={Images.iconImage}
            />
          )
        }}
        component={HomeScreen} />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <Image source={{ uri: userSecureStoreData?.photo || 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png' }} style={[Images.profileIcon, rootStyle.mt02, { borderColor: color }]} />,
          tabBarLabel: '',
          headerTitle: () => (
            <></>
          ),
          headerRight: () => (
            <Pressable>
              {({ pressed }) => (
                <Octicons
                  name="gear"
                  size={25}
                  themeText
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable>
              {({ pressed }) => (
                <View style={[Rowstyle.row, rootStyle.pl3, rootStyle.alignCenter, themeView, {}]}>
                  <TruncatedTextBold content={userSecureStoreData?.username || `(ツ)`} maxSize={15} style={[text.fz25, { opacity: pressed ? 0.5 : 1 }]} />
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={25}
                    themeText
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                </View>

              )}
            </Pressable>
          ),
          headerBackground: () => (
            <View style={{ flex: 1 }} />
          ),
        }}
        component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function LayoutAuth() {
  const { authState } = useAuth();


  SplashScreen.preventAutoHideAsync();
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ProdBold: require('../../assets/fonts/ProductSans-Bold.ttf'),
    ProdLight: require('../../assets/fonts/ProductSans-Light.ttf'),
    ProdRegular: require('../../assets/fonts/ProductSans-Regular.ttf'),
    ProdThin: require('../../assets/fonts/ProductSans-Thin.ttf'),
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
