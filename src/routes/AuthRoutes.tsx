import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '../auth/_layouts/login';
import { AuthProvider, useAuth } from '../auth/services/AuthService';
import MainHome from '../home/MainHome';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useTransition } from 'react';
import { SplashScreen } from 'expo-router';
import '../i18n/i18n';
const Stack = createStackNavigator();

const LayoutAuth = () => {
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
              <Stack.Screen name="Home" options={{ headerRight: () => <Button onPress={onLogout} title="SIgn Out" /> }} component={MainHome} />
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