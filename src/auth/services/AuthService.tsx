import axios, { AxiosError } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { LoginUserReq, LoginUserRes, UserReq, UserRes } from '../../interface/User.interface';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';
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
      const authToken = await SecureStore.getItemAsync('userAuthorizeName');
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
      const response = await axios.post(`${API_URL}/users`, { ...userData, createdAt });
      const newUser: UserRes = { _id: response.data._id, ...userData };
      return newUser;
    } catch (error) {
      throw new Error('Erro ao cadastrar: ' + error);
    }
  };
  const loginService = async (loginUserReq: LoginUserReq) => {
    try {
      const response: any = await axios.post(
        `${API_URL}/login`, loginUserReq,
        {
          withCredentials: true,
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
        });

      if (!response.data) {
        throw new Error('Resposta do servidor sem dados');
      }
      const usernameDataMatch = /usernamedata=(\w+)/.exec(response.headers['usernamedata'] || '');
      const username = usernameDataMatch ? usernameDataMatch[1] : null;

      const user: LoginUserRes = { ...response.data, password: undefined, username: username };
      setAuthState({
        token: user.accessToken,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = `Barrer ${user.accessToken}`

      try {
        await SecureStore.setItemAsync('userAuthorizeName', user.username);
        await SecureStore.setItemAsync('userAuthorizeToken', user.accessToken);
        console.warn('salvou no store')
        return user;
      } catch (error) {
        console.warn('não salvou no store')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Erro ao fazer login');
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userAuthorizeToken');
    await SecureStore.deleteItemAsync('userAuthorizeName');
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
