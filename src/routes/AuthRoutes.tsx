import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '../auth/_layouts/login';
import { AuthProvider, useAuth } from '../auth/services/AuthService';
import MainHome from '../home/MainHome';
const Stack = createStackNavigator();

const LayoutAuth = () => {
  const { authState, onLogout } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen name="Home" options={{headerRight: () => <Button onPress={onLogout} title="SIgn Out"/>}} component={MainHome} />
        ) : (
            <Stack.Screen name="Login" component={LoginPage} />
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
     <LayoutAuth/>
    </AuthProvider>
  );
};
export default AppRoutes;