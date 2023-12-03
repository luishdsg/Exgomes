// authService.ts

import axios from 'axios';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: number;
  username: string;
  password: string;
  token: string | null;
}

interface SignupCredentials {
  username: string;
  password: string;
}

export const signupService = async ({ username, password }: SignupCredentials): Promise<User> => {
  try {
    const token = uuidv4();
    const newUser: User = { id: Date.now(), username, password, token };
    await axios.post('https://385d-179-54-192-206.ngrok.io/users', newUser);
    console.log('Usuário cadastrado com sucesso:', newUser);
    return newUser; 
  } catch (error) {
    throw new Error('Erro ao cadastrar: ' + error);
  }
};
