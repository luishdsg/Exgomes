import * as SecureStore from 'expo-secure-store';
import { UserRes } from '../base/User.base';
import { storeProps } from '../interface/Props.interface';

const getSecureStoreData = async () => {
  const userAuthorizeId = await SecureStore.getItemAsync('userAuthorizeId');
  const userAuthorizeBlocked = await SecureStore.getItemAsync('userAuthorizeBlocked');
  const userAuthorizeFavorites = await SecureStore.getItemAsync('userAuthorizeFavorites');
  const userAuthorizeFollowers = await SecureStore.getItemAsync('userAuthorizeFollowers');
  const userAuthorizeFollowing = await SecureStore.getItemAsync('userAuthorizeFollowing');
  const userAuthorizeHated = await SecureStore.getItemAsync('userAuthorizeHated');
  const userAuthorizeUsername = await SecureStore.getItemAsync('userAuthorizeUsername');
  const userAuthorizePosts = await SecureStore.getItemAsync('userAuthorizePosts');
  const userAuthorizePhoto = await SecureStore.getItemAsync('userAuthorizePhoto');
  const userAuthorizeSaved = await SecureStore.getItemAsync('userAuthorizeSaved');
  const userAuthorizeTrash = await SecureStore.getItemAsync('userAuthorizeTrash');
  const userAuthorizeEmail = await SecureStore.getItemAsync('userAuthorizeEmail');
  const userAuthorizeVerified = await SecureStore.getItemAsync('userAuthorizeVerified');
  const userAuthorizeBirth = await SecureStore.getItemAsync('userAuthorizeBirth');
  const userAuthorizeLocal = await SecureStore.getItemAsync('userAuthorizeLocal');
  const userAuthorizeLang = await SecureStore.getItemAsync('userAuthorizeLang');
  const userAuthorizeToken = await SecureStore.getItemAsync('userAuthorizeToken');
  const theme = await SecureStore.getItemAsync('theme');

  if (
    userAuthorizeId &&
    userAuthorizeBlocked &&
    userAuthorizeFavorites &&
    userAuthorizeFollowers &&
    userAuthorizeFollowing &&
    userAuthorizeHated &&
    userAuthorizeUsername &&
    userAuthorizePosts &&
    userAuthorizePhoto &&
    userAuthorizeSaved &&
    userAuthorizeTrash &&
    userAuthorizeEmail &&
    userAuthorizeVerified &&
    userAuthorizeBirth &&
    userAuthorizeLocal &&
    userAuthorizeLang &&
    userAuthorizeToken) {
    const storeAuthorizeId:string = JSON.parse(userAuthorizeId);
    const storeAuthorizeBlocked:Array<string> = JSON.parse(userAuthorizeBlocked);
    const storeAuthorizeFavorites:Array<string> = JSON.parse(userAuthorizeFavorites);
    const storeAuthorizeFollowers:Array<string> = JSON.parse(userAuthorizeFollowers);
    const storeAuthorizeFollowing:Array<string> = JSON.parse(userAuthorizeFollowing);
    const storeAuthorizeHated:Array<string> = JSON.parse(userAuthorizeHated);
    const storeAuthorizeUsername:string  = JSON.parse(userAuthorizeUsername);
    const storeAuthorizePosts:Array<string> = JSON.parse(userAuthorizePosts);
    const storeAuthorizePhoto:string  = JSON.parse(userAuthorizePhoto);
    const storeAuthorizeSaved:Array<string> = JSON.parse(userAuthorizeSaved);
    const storeAuthorizeTrash:Array<string> = JSON.parse(userAuthorizeTrash);
    const storeAuthorizeEmail:string  = JSON.parse(userAuthorizeEmail);
    const storeAuthorizeVerified:boolean = JSON.parse(userAuthorizeVerified);
    const storeAuthorizeBirth:Date = JSON.parse(userAuthorizeBirth);
    const storeAuthorizeLocal:string  = JSON.parse(userAuthorizeLocal);
    const storeAuthorizeLang:string  = JSON.parse(userAuthorizeLang);
    const authData:storeProps = { 
      Id: storeAuthorizeId,
      Blocked: storeAuthorizeBlocked,
      Favorites: storeAuthorizeFavorites,
      Followers: storeAuthorizeFollowers,
      Following: storeAuthorizeFollowing,
      Hated: storeAuthorizeHated,
      Username: storeAuthorizeUsername,
      Posts: storeAuthorizePosts,
      Photo: storeAuthorizePhoto,
      Saved: storeAuthorizeSaved,
      Trash: storeAuthorizeTrash,
      Email: storeAuthorizeEmail,
      Verified: storeAuthorizeVerified,
      Birth: storeAuthorizeBirth,
      Local: storeAuthorizeLocal,
      Lang: storeAuthorizeLang,
      token: userAuthorizeToken, 
      theme: theme }
    return authData;
  }
};

export default getSecureStoreData;
