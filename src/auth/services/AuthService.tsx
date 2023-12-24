import axios, { AxiosError } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { LoginUserReq, LoginUserRes, UserReq, UserRes } from '../../interface/User.interface';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onSignUp?: (userData: UserReq) => Promise<any>;
  onLogin?: (loginUserReq: LoginUserReq) => Promise<any>;
  onLogout?: () => Promise<any>;
}
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => { 
  return useContext(AuthContext);
}

export const API_URI = 'http://192.168.1.8:3001/'

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const authToken = await SecureStore.getItemAsync('authToken');
      if (authToken) {
        axios.defaults.headers.common['Authorization'] = `Barrer ${authToken}`

        setAuthState({
          token: authToken,
          authenticated: true
        });
      }
    };
    loadToken();
  }, []);


  const signupService = async (userData: UserReq) => {
    try {
      const createdAt = new Date();
      const response = await axios.post(`${API_URI}users`, { ...userData, createdAt });
      console.log('Resposta do servidor:', response);
      const newUser: UserRes = { _id: response.data._id, ...userData, password: undefined};
      console.log('Usuário cadastrado com sucesso:', newUser);
      return newUser;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Erro ao fazer a solicitação:', axiosError.message);
        if (axiosError.response) {
          console.error('Resposta do servidor:', axiosError.response.data);
        }
      } else {
        console.error('Erro ao cadastrar:', error);
      }
      throw new Error('Erro ao cadastrar: ' + error);
    }
  };
  const loginService = async (loginUserReq: LoginUserReq) => {
    try {
      const response: any = await axios.post(
        `${API_URI}login`,loginUserReq,
        {
          withCredentials: true,
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
        });

      console.log('Resposta do servidor:', response);

      if (!response.data) {
        throw new Error('Resposta do servidor sem dados');
      }

      const user: LoginUserRes = { ...response.data, password: undefined };
      console.log('Resposta ao front:', user);
      setAuthState({
        token: user.accessToken,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = `Barrer ${user.accessToken}`

      await SecureStore.setItemAsync('authToken', user.accessToken);

      return user;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Erro ao fazer login');
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false
    });
  }


 
  const value = {
    onSignUp: signupService,
    onLogin: loginService,
    onLogout: logout,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}



// PASSAR O TOKEN NO CABEÇALIO
// axios.get('http://sua-api/exemplo/rota1', {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// })
