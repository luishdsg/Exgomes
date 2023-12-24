// LoginScreen.js
import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { LoginUserReq, UserReq } from '../../interface/User.interface';
import { API_URI, useAuth } from '../services/AuthService';
import axios from 'axios';
import LoginErrorModal from '../../components/modal/ModalLogin';
const LoginPage: React.FC= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { onLogin, onSignUp } = useAuth();

  useEffect(() => {
    const testCall = async () => {
      const result = await axios.get(`${API_URI}users`);
      console.log("teste"+result);
    };
    testCall();
  }, []);

  const handleLogin = async () => {
    try {
      const login: LoginUserReq ={
        username: username,
        password: password,
      }
      const user = await onLogin!(login);
      if (user! && user.error) {
        alert(user.msg)
      }
    } catch (error) {
      setErrorMessage(`${error}Senha incorreta`); 
      setErrorModalVisible(true);
    }
  };

  const handleSignUp = async () => {
     try {
      const signUp: UserReq ={
        username: username,
        password: password,
      }
      const user = await onSignUp!(signUp);
      if (user! && user.error) {
        alert(user.msg)
      }else{
        handleLogin();
      }
    } catch (error) {
      setErrorMessage(`${error}Senha incorreta`);
      setErrorModalVisible(true);
    }
  }
  return (
    <View>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="SignUp" onPress={handleSignUp} />
      <LoginErrorModal
        visible={errorModalVisible}
        errorMessage={errorMessage}
        onClose={() => setErrorModalVisible(false)}
      />
    </View>
  );
};

export default LoginPage;
