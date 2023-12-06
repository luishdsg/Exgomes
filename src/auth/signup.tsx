// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signupService } from '../services/SignupService';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignupScreenProps {
    navigation: StackNavigationProp<any, 'Signup'>;
}

const SignupPage: React.FC<SignupScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');

    const handleSignup = async () => {
        try {
            const user = await signupService({ username, password, gender });
            if (user && user.token) {
                await AsyncStorage.setItem('token', user.token);
                navigation.navigate('Home', { token: user.token });
              }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    const goLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <View>
            <Text>Signup</Text>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput placeholder="Gender" value={gender} onChangeText={setGender} />

            <Button title="Signup" onPress={handleSignup} />
            <Button title="Login" onPress={goLogin} />
        </View>
    );
};

export default SignupPage;
