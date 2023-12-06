// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { loginService } from '../services/LoginService';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage

interface LogiinProps {
  navigation: StackNavigationProp<any, 'Login'>;
}

const LoginPage: React.FC<LogiinProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginService({ username, password });
      if (user && user.token) {
        await AsyncStorage.setItem('token', user.token);
        navigation.navigate('Home', { userId: user.token });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginPage;
