import * as SecureStore from 'expo-secure-store';

const getSecureStoreData = async () => {
  const userAuthorizeName = await SecureStore.getItemAsync('userAuthorizeName');
  const userAuthorizeToken = await SecureStore.getItemAsync('userAuthorizeToken');
  if (userAuthorizeName && userAuthorizeToken) {
    return { username: userAuthorizeName, token: userAuthorizeToken };
  }
};

export default getSecureStoreData;
