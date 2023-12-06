// authService.ts
import axios from 'axios';

interface LoginCredentials {
  username: string;
  password: string;
}
const API_URL = process.env.API_URL;

export const loginService = async ({ username, password }: LoginCredentials): Promise<{ token: string }> => {
  try {
    const response = await axios.get(`${API_URL}/users?username=${username}&password=${password}`);
    const { token } = response.data;
    if (!token) {
      throw new Error('Token não recebido do servidor');
    }  
    return { token };
  } catch (error) {
    throw new Error('Erro ao fazer login: ' + error);
  }
};
