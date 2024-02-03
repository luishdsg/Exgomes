import * as SecureStore from 'expo-secure-store';
import { UserRes } from '../base/User.base';

const getSecureStoreData = async () => {
  const userAuthorizeUser = await SecureStore.getItemAsync('userAuthorizeData');
  const userAuthorizeToken = await SecureStore.getItemAsync('userAuthorizeToken');

  if (userAuthorizeUser && userAuthorizeToken) {
    const storedUserAuth:UserRes = JSON.parse(userAuthorizeUser);
    const authData = { userAuth: storedUserAuth, token: userAuthorizeToken }
    return authData;
  }
};

export default getSecureStoreData;
