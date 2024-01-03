import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '../auth/_layouts/login';
import { AuthProvider, useAuth } from '../auth/services/AuthService';
import '../i18n/i18n';
import ContactsScreen from '../pages/contacts';
import HomeScreen from '../pages/home';
import ProfileScreen from '../pages/profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabBarNavigator() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="Feed" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
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

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>

            {authState?.authenticated ? (
              <>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabBarNavigator} />
                <Stack.Screen name="Contacts" component={ContactsScreen} />
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
{/* <Stack.Screen name="Home" options={{ headerRight: () => <Button onPress={onLogout} title="SIgn Out" /> }} component={MainHome} /> */ }
