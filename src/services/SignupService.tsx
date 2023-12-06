// authService.ts

import axios from 'axios';

interface User {
  id: number;
  username: string;
  password: string;
  gender?: string;
  token: string;
}

interface SignupCredentials {
  username: string;
  password: string;
  gender?: string;
}
const API_URL = process.env.API_URL;
export const signupService = async ({ username, password, gender }: SignupCredentials): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/users`, { username, password, gender });
    const token = response.data.token;
    if (!token) {
      throw new Error('Token não recebido do servidor');
    }
    const newUser: User = { id: response.data.id, username, password, gender, token };
    console.log('Usuário cadastrado com sucesso:', newUser);
    return newUser;
  } catch (error) {
    throw new Error('Erro ao cadastrar: ' + error);
  }
};
