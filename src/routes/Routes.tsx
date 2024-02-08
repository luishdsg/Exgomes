import { USER_ICON } from '@env';
import { Feather, MaterialIcons, Octicons } from '@expo/vector-icons';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Image, Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '../auth/login';
import { AuthProvider, useAuth } from '../auth/services/AuthService';
import { UserRes } from '../base/User.base';
import { ProdBold, TruncatedTextBold } from '../components/StyledComponents';
import getSecureStoreData from '../constants/SecureStore';
import '../i18n/i18n';
import { RootStackParamList } from '../interface/RootStackParamList';
import HomeScreen from '../pages/home';
import ProfileScreen from '../pages/profile';
import SettingsScreen from '../pages/settings';
import { Images, rootStyle, rowstyle, text } from '../style';
import { colors } from '../style/Colors';
import { useThemeController } from '../style/Themed';
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type ScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

const fonts = () => {
  return Font.loadAsync({
    'ProdBold': require('../../assets/fonts/ProductSans-Bold.ttf'),
    'ProdLight': require('../../assets/fonts/ProductSans-Light.ttf'),
    'ProdRegular': require('../../assets/fonts/ProductSans-Regular.ttf'),
    'ProdThin': require('../../assets/fonts/ProductSans-Thin.ttf'),
    'ArialRoundedMTBold': require('../../assets/fonts/ProductSans-Regular.ttf'),
  });
};

function HomeTabBarNavigator() {
  const [userSecureStoreData, setUserSecureStoreData] = useState<{ userAuth: UserRes; token: string; }>(null);
  const { themeWB, themeWTD, themeGTD, themeBWI, themeBW, themeWIB, themeWITD, themeGLD, themeGLTD, themeStatus, Status, _toggleTheme } = useThemeController();
  const isDarkLogo = themeStatus === 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');
  const navigation = useNavigation<ScreenNavigationProp>();
  const { onLogout } = useAuth();


  const getUserAuthorizeData = async () => {
    try {
      const data = await getSecureStoreData();
      if (data) setUserSecureStoreData(data);
    } catch (error: any) {
      console.log('sem dados do usuario posthome')
      return error.message;
    }
  };

  useEffect(() => {
    getUserAuthorizeData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: 'transparent',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { color: themeBW },
        tabBarActiveTintColor: colors.patternColor,
      }}
      tabBar={(props) => (
        <BlurView style={[rootStyle.w100, rootStyle.Pabsolute, rootStyle.b0, Platform.OS === 'ios' ? rootStyle.h50 : rootStyle.h90,]} intensity={20} tint={Platform.OS === 'ios' ? 'dark' : 'dark'}  >
          <BottomTabBar {...props} />
        </BlurView>
      )}
      initialRouteName="Feed">
      <Tab.Screen
        name="Feed"
        options={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            height: Platform.OS === 'ios' ? 50 : 90,
            width: '100%',
            elevation: 0,
            position: 'absolute',
            borderTopWidth: 1,
            borderTopColor: 'transparent',
          },
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <Feather name="home" style={[rootStyle.mt2, {}]} size={30} color={color} />,
          headerRight: () => (
            <View style={[rootStyle.centralize, { flexDirection: 'row' }]}>
              <TouchableOpacity style={[rootStyle.mx1, {}]}><Button onPress={onLogout} title="SIgn Out" /></TouchableOpacity>

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
            </View>

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
        component={HomeScreen}
      // children={() => <HomeScreen navigation={null} data={dataAuth}/>}
      />
      <Tab.Screen
        name="Profile"
        options={{
          // tabBarStyle: {
          //   backgroundColor: 'transparent',
          //   },
          tabBarIcon: ({ color }) => <Image source={{ uri: userSecureStoreData?.userAuth?.photo || `${USER_ICON}` }} style={[Images.profileIcon, rootStyle.mt02, { borderColor: color }]} />,
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
                  <TruncatedTextBold content={userSecureStoreData?.userAuth?.username || `(ツ)`} maxSize={15} style={[text.fz25, { color: themeBW, opacity: pressed ? 0.5 : 1 }]} />
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
  const [fontesLoaded, setFontesLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      try {
        SplashScreen.preventAutoHideAsync();
        await fonts();
        SplashScreen.hideAsync();
        setFontesLoaded(true);
      } catch (error) {
        console.error('Erro ao carregar fontes ou esconder o SplashScreen:', error);
      }
    }

    loadFonts();
  }, []);

  if (!fontesLoaded) {
    console.log('Carregando fontes...');
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
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
