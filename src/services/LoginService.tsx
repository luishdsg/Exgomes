// authService.ts
import axios from 'axios';


interface LoginCredentials {
  username: string;
  password: string;
}

export const loginService = async ({ username, password }: LoginCredentials): Promise<void> => {
  try {
    const response = await axios.get(`https://385d-179-54-192-206.ngrok.io/users?username=${username}&password=${password}`);
      return response.data;
  } catch (error) {
    throw new Error('Erro ao fazer login: ' + error);
  }
};
