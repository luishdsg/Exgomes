// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { loginService } from '../services/LoginService';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
interface LogiinProps {
  navigation: StackNavigationProp<any, 'Login'>;
}

const LoginPage: React.FC<LogiinProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        await loginService({ username, password });
        navigation.navigate('Home', { userId: username });
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
