import { API_URL, USER_ICON } from '@env';
import { Feather, MaterialIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer, NavigationProp, RouteProp, ThemeProvider, useNavigation } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Image, Pressable, TouchableOpacity, View, useColorScheme } from 'react-native';
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
import { Images, rowstyle, rootStyle, text } from '../style';
import Colors, { colors } from '../style/Colors';
import { useThemeController } from '../constants/Themed';
import SettingsScreen from '../pages/settings';
import { RootStackParamList } from '../interface/RootStackParamList';
import { goBack } from '../constants/NavigationService';
import { useTranslation } from 'react-i18next';
import PopUpErrorModal from '../components/modal/PopUpErrorModal';
import { CommentsPostModal } from '../components/modal/CommentsPostModal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type ScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;


function HomeTabBarNavigator() {
  const [userSecureStoreData, setUserSecureStoreData] = useState<UserRes | null>(null);
  const { themeWB, themeWTD, themeGTD, themeBWI, themeBW, themeWIB, themeWITD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
  const isDarkLogo = themeStatus === 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');
  const navigation = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    const getUserAuthorizeData = async () => {
      try {
        const data = await getSecureStoreData();
        if (data) {
          console.log(data?.username + '   <<   os nomes')
          const getUserData = await axios.get<UserRes>(`${API_URL}/users/${data?.username}`);
          setUserSecureStoreData(getUserData.data);
          console.log(getUserData.data.photo + '    <<    os dados')
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
          backgroundColor: themeWIB,
          height: 90,
          borderTopWidth: 1,
          borderTopColor: themeGLD,
        },
        tabBarLabelStyle: { color: themeBW },
        tabBarActiveTintColor: colors.patternColor,
      }} initialRouteName="Feed">
      <Tab.Screen
        name="Feed"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <Feather name="home" style={[rootStyle.mt02, {}]} size={30} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
            >
              {({ pressed }) => (

                <Octicons
                  name="gear"
                  size={25}
                  color={themeBWI}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          headerBackground: () => (
            <View style={[rootStyle.container, { backgroundColor: themeWIB }]} />
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
          tabBarIcon: ({ color }) => <Image source={{ uri: userSecureStoreData?.photo || `${USER_ICON}` }} style={[Images.profileIcon, rootStyle.mt02, { borderColor: color }]} />,
          tabBarLabel: '',
          headerTitle: () => (
            <></>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
            >
              {({ pressed }) => (
                <Octicons
                  name="gear"
                  size={25}
                  color={themeBWI}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable>
              {({ pressed }) => (
                <View style={[rowstyle.row, rootStyle.pl2, rootStyle.alignCenter, { backgroundColor: themeWIB }]}>
                  <TruncatedTextBold content={userSecureStoreData?.username || `(ツ)`} maxSize={15} style={[text.fz25, { color: themeBW, opacity: pressed ? 0.5 : 1 }]} />
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={25}
                    color={themeBW}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                </View>

              )}
            </Pressable>
          ),
          headerBackground: () => (
            <View style={[rootStyle.container, { backgroundColor: themeWIB }]} />
          ),
        }}
        component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function LayoutAuth() {
  const { authState } = useAuth();
  const { themeWB, themeWTD, themeTDW, themeBWI, themeBW, themeWIB, themeWITD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
  const { t, i18n: { changeLanguage, language } } = useTranslation();

  SplashScreen.preventAutoHideAsync();
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ProdBold: require('../../assets/fonts/ProductSans-Bold.ttf'),
    ProdLight: require('../../assets/fonts/ProductSans-Light.ttf'),
    ProdRegular: require('../../assets/fonts/ProductSans-Regular.ttf'),
    ProdThin: require('../../assets/fonts/ProductSans-Thin.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    console.log('sem fonte' + error);
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.ModalSlideFromBottomIOS.cardStyleInterpolator,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            gestureEnabled: true,
          }}
        >
          {authState?.authenticated ? (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabBarNavigator} />
            </>
          ) : (
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginPage} />
          )}
          <Stack.Group screenOptions={{ presentation: 'modal' }}>

            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerLeft: () => (<></>),
                headerTitle: () => (
                  <ProdBold style={[text.fz20]}>{t('settings.settings')}</ProdBold>
                ),
                cardStyle: {
                  backgroundColor: themeWIB,
                  top: 80,
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25
                },
              }}
            />
         
          </Stack.Group>

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
