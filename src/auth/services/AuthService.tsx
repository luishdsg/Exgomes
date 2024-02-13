import axios, { AxiosError } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthReq, AuthRes, UserReq, UserRes } from '../../base/User.base';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';
import { userByUsername } from '../../services/user.service';
interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onSignUp?: (userData: UserReq) => Promise<any>;
  onLogin?: (AuthReq: AuthReq) => Promise<any>;
  onLogout?: () => Promise<any>;
}
const AuthContext = createContext<AuthProps>({});
export const useAuth = () => {return useContext(AuthContext);}

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
      const authToken = await SecureStore.getItemAsync('userAuthorizeToken');
      if (authToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
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




  const loginService = async (AuthReq: AuthReq) => {
    try {
      const response: any = await axios.post(`${API_URL}/login`, AuthReq,
        {
          withCredentials: true,
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
        });
      if (!response.data) throw new Error('Resposta do servidor sem dados');
      const usernameDataMatch = /usernamedata=(\w+)/.exec(response.headers['usernamedata'] || '');
      const username = usernameDataMatch ? usernameDataMatch[1] : null;
      const user: AuthRes = { ...response.data, password: undefined, username: username };
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`
      try {
        await SecureStore.setItemAsync('userAuthorizeToken', user.accessToken);
        const userAuth = await axios.get<UserRes>(`${API_URL}/users/username${user?.username}`);
        await SecureStore.setItemAsync('userAuthorizeId', JSON.stringify(userAuth.data._id));
        await SecureStore.setItemAsync('userAuthorizeBlocked', JSON.stringify(userAuth.data.block));
        await SecureStore.setItemAsync('userAuthorizeFavorites', JSON.stringify(userAuth.data.favorites));
        await SecureStore.setItemAsync('userAuthorizeFollowers', JSON.stringify(userAuth.data.followers));
        await SecureStore.setItemAsync('userAuthorizeFollowing', JSON.stringify(userAuth.data.following));
        await SecureStore.setItemAsync('userAuthorizeHated', JSON.stringify(userAuth.data.hated));
        await SecureStore.setItemAsync('userAuthorizeUsername', JSON.stringify(userAuth.data.username));
        await SecureStore.setItemAsync('userAuthorizePosts', JSON.stringify(userAuth.data.posts));
        await SecureStore.setItemAsync('userAuthorizePhoto', JSON.stringify(userAuth.data.photo));
        await SecureStore.setItemAsync('userAuthorizeSaved', JSON.stringify(userAuth.data.saved));
        await SecureStore.setItemAsync('userAuthorizeTrash', JSON.stringify(userAuth.data.trash));
        await SecureStore.setItemAsync('userAuthorizeEmail', JSON.stringify(userAuth.data.email));
        await SecureStore.setItemAsync('userAuthorizeVerified', JSON.stringify(userAuth.data.verified));
        await SecureStore.setItemAsync('userAuthorizeBirth', JSON.stringify(userAuth.data.birth));
        await SecureStore.setItemAsync('userAuthorizeLocal', JSON.stringify(userAuth.data.local));
        await SecureStore.setItemAsync('userAuthorizeLang', JSON.stringify(userAuth.data.lang));
        console.warn('salvou na poha do store')
        setAuthState({
          token: user.accessToken,
          authenticated: true
        });
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
    // await SecureStore.deleteItemAsync('userAuthorizeToken');
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

export const _getUserLog = async (username: string):Promise<UserRes> => {
  try {
    const result = await axios.get<UserRes>(`${API_URL}/users/username${username}`);
    return result.data
  } catch (error) {
    console.error('Não peguei o usuario no login')
  }
};