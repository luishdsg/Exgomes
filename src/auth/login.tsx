import { API_URL } from '@env';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Switch } from 'react-native-ios-kit';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/Octicons';
import { ImageMediumComponent, ImageMinComponent, ProdBold, ProdLight, ProdRegular } from '../components/StyledComponents';
import { useFadeAnimation } from '../shared/animations/animations';
import ForgotPassModal from '../components/modal/ForgotPassModal';
import PopUpError from '../components/modal/PopUpErrorModal';
import { useThemeController } from '../style/Themed';
import { AuthReq, UserReq, UserRes } from '../base/User.base';
import { loginStyle, rootStyle, text } from '../style';
import { colors } from '../style/Colors';
import { _getUserLog, useAuth } from './services/AuthService';
import { _handleNextInput, vibrate } from '../tools/Tools';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('string');
  const [password, setPassword] = useState('string');
  const [showPassword, setShowPassword] = useState(false);
  const [isSwitched, setIsEnabled] = useState(false);
  const inputRefPass = useRef(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [illustrationError, setillustrationError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [userLog, setUserLog] = useState<UserRes | null>(null);
  const { onLogin, onSignUp } = useAuth();
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [lang, setLang] = useState(language);
  const { themeWB, themeWTD, themeGTD, themeBWI, themeBW, themeWIB, themeWITD, themeGLD, themePG, Status, _toggleTheme } = useThemeController();
  const keyboardVerticalOffset = Platform.OS === 'android' ? -350 : 0;

  const { fadeAnim: fadeAnimUsername, fadeIn: fadeInUsername, fadeOut: fadeOutUsername } = useFadeAnimation();
  const { fadeAnim: fadeAnimPassword, fadeIn: fadeInPassword, fadeOut: fadeOutPassword } = useFadeAnimation();

  const userLogData = async () => { setUserLog(await _getUserLog(username)) }


  const _handlerChangeLanguage = () => {
    const newLang = lang === 'pt' ? 'pt' : 'en'
    changeLanguage(newLang);
    setLang(newLang)
  }


  const clearInput = () => {
    setUsername('');
    vibrate();
  };

  const _handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const _handleLogin = async () => {
    try {
      const login: AuthReq = {
        username: username,
        password: password,
      }
      setIsLoadingLogin(true);
      if (username.trim() === '') {
        setIsUsernameEmpty(true);
        fadeInUsername();
        setTimeout(() => { setIsUsernameEmpty(false), fadeOutUsername() }, 2000);
        vibrate();
      } else {
        setIsUsernameEmpty(false);
        fadeOutUsername();
      }
      if (password.trim() === '') {
        setTimeout(() => { setIsPasswordEmpty(false), fadeOutPassword() }, 2000);
        setIsPasswordEmpty(true);
        fadeInPassword(); vibrate();
      } else {
        setIsPasswordEmpty(false);
        fadeOutPassword();
      }

      if (username.trim() !== '' && password.trim() !== '') {
        const user = await onLogin!(login);
        if (user! && user.error) {
          alert(user.msg)
        }
      }
      setIsLoadingLogin(false);
    } catch (error) {
      setErrorMessage(t('login.incorrectLogin'));
      setillustrationError('https://i.imgur.com/yybex4u.png')
      setErrorModalVisible(true);
      vibrate();
      setIsLoadingLogin(false);
    }
  };

  const _handleSignUp = async () => {
    try {
      const signUp: UserReq = {
        username: username,
        password: password,
      }
      setIsLoadingSignUp(false);

      if (username.trim() === '') {
        setIsUsernameEmpty(true);
        setTimeout(() => { setIsUsernameEmpty(false); }, 2000);
        fadeInUsername();
        vibrate();
      } else {
        setIsUsernameEmpty(false);
        fadeOutUsername();
      }

      if (password.trim() === '') {
        setTimeout(() => { setIsPasswordEmpty(false); }, 2000);
        setIsPasswordEmpty(true);
        fadeInPassword();
        vibrate();

      } else {
        setIsPasswordEmpty(false);
        fadeOutPassword();
      }

      if (userLog?.username) {
        setErrorMessage(t('login.userexist', { userexist: username }));
        setillustrationError('https://i.imgur.com/UAxKfJA.png')
        setErrorModalVisible(true);
        vibrate();
        return;
      }

      if (username.trim() !== '' && password.trim() !== '') {
        const user = await onSignUp!(signUp);
        if (user! && user.error) {
          alert(user.msg)
        } else {
          _handleLogin();
        }
      }
      setIsLoadingSignUp(false);
    } catch (error) {
      setErrorMessage(t('login.errorserver'));
      setillustrationError('https://i.imgur.com/4NaFeXr.jpg')
      setErrorModalVisible(true);
      vibrate();
      setIsLoadingSignUp(false);
    }
  }

  const _handleForgotPass = async () => {
    setModalVisible(!modalVisible);
    setModalMessage("esqueceu a senha né")
  }

  const _changeThemeSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    console.log(isSwitched)
    _toggleTheme();
  }


  const _getTheme = async () => {
    const storedTheme = await SecureStore.getItemAsync('theme');
    if (storedTheme === 'dark') setIsEnabled(true);
  }

  
  useEffect(() => {
    userLogData();
    _getTheme();
    console.log(userLog)
    if (username.length >= 3) _getUserLog(username);
  }, [username]);


  return (
    <KeyboardAvoidingView
      style={rootStyle.container}
      behavior="padding"
      enabled
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={[rootStyle.view, { backgroundColor: themeWIB }]}>
          <View style={loginStyle.loginImage}>
            <ImageMediumComponent source={require('../../assets/img/ill-01.png')} />
            <ImageMinComponent source={require('../../assets/icon.png')} />
          </View>
          <View style={[rootStyle.p1, rootStyle.centralize]}>
            <ProdBold style={[text.fz30, text.centralizeText, { color: themeBWI }]}>{t('login.title')}</ProdBold>
            <ProdRegular style={[text.fz20, text.centralizeText, rootStyle.mt02, text.fontBold, { color: themeGTD }]}>{t('login.subtitle')}</ProdRegular>
          </View>
          <View style={[rootStyle.halfview, rootStyle.centralize]}>
            <View style={[rootStyle.view, { maxWidth: 500 }]}>
              <Animated.Text style={[rootStyle.errorMessage, { opacity: fadeAnimUsername }]}>
                {t('tools.userEmpty')}
              </Animated.Text>
              <View style={[loginStyle.inputContainer, rootStyle.h50, { backgroundColor: themeWB }]}>
                <TextInput
                  style={[loginStyle.input, rootStyle.h50, text.fz20, isUsernameEmpty && rootStyle.inputError, { color: themeBWI }]}
                  placeholder={t('tools.inputUser')}
                  placeholderTextColor={colors.gray}
                  value={username} editable={true}
                  contextMenuHidden={false}
                  returnKeyType="next"
                  onSubmitEditing={() => { _handleNextInput(inputRefPass) }}
                  onChangeText={(text) => { setUsername(text); setIsUsernameEmpty(false) }}
                />
                {username.length > 3 && (
                  <Animated.View style={[loginStyle.profile, {}]}><Avatar url={userLog?.photo} size={35} /></Animated.View>
                )}
                {username.length > 0 && (
                  <TouchableOpacity style={[rootStyle.mx1, rootStyle.h50, rootStyle.centralize, { position: 'absolute', top: -2, right: 0, }]} onPress={clearInput}>
                    <EvilIcons name="close" color={themeBW} size={24} themeText />
                  </TouchableOpacity>
                )}
              </View>
              <View style={[loginStyle.inputContainer, rootStyle.h50, { backgroundColor: themeWB }]}>
                <TextInput
                  style={[loginStyle.input, rootStyle.h50, text.fz20, isPasswordEmpty && rootStyle.inputError, { color: themeBWI }]}
                  placeholder={t('tools.inputPass')}
                  placeholderTextColor={colors.gray}
                  value={password} editable={true}
                  ref={inputRefPass}
                  returnKeyType="done"
                  onSubmitEditing={() => { Keyboard.dismiss(); }}
                  onChangeText={(text) => { setPassword(text); setIsPasswordEmpty(false) }}
                  secureTextEntry={!showPassword}
                />
                {password.length > 0 && (
                  <TouchableOpacity style={[rootStyle.mx1, rootStyle.h50, rootStyle.centralize, { right: -5 }]} onPress={_handleShowPass}>
                    <Icon name={showPassword ? 'eye' : 'eye-closed'} color={colors.gray} style={loginStyle.pass} size={24} />
                  </TouchableOpacity>
                )}
              </View>
              <Animated.Text style={[rootStyle.errorMessage, { opacity: fadeAnimPassword }]}>
                {t('tools.passEmpty')}
              </Animated.Text>
              <View style={[loginStyle.buttonArea, rootStyle.px1,]}>
                <TouchableOpacity style={[rootStyle.btnPatter, rootStyle.centralize]} onPress={_handleLogin}>
                  {isLoadingLogin ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                  ) : (
                    <ProdBold style={[text.fz20, text.centralizeText, { color: colors.white }]}>{t('login.login')}</ProdBold>
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={[rootStyle.btnPatterpass, rootStyle.mt1, rootStyle.centralize]} onPress={_handleSignUp}>
                  {isLoadingSignUp ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                  ) : (
                    <ProdBold style={[text.fz20, text.centralizeText, { color: colors.patternColor }]}>{t('login.signup')}</ProdBold>
                  )}
                </TouchableOpacity>
                <View style={[rootStyle.centralize, rootStyle.mt2]}>
                  <ProdLight onPress={_handleForgotPass} style={[text.centralizeText, { color: themeBWI }]}>━━━━━━  {t('login.forgotPass')}¯\_(ツ)_/¯  ━━━━━━</ProdLight>
                </View>
                <Switch
                  trackColor={{ false: themeGTD, true: colors.patternColor }}
                  onValueChange={_changeThemeSwitch}
                  value={isSwitched}
                />
              </View>
            </View>

          </View>
        </ScrollView >
      </TouchableWithoutFeedback>
      <ForgotPassModal
        visible={modalVisible}
        errorMessage={modalMessage}
        onClose={_handleForgotPass}
      />
      <PopUpError
        username={username}
        image={illustrationError}
        visible={errorModalVisible}
        errorMessage={errorMessage}
        onClose={() => {
          setErrorModalVisible(false)
        }}
      />
      <Status />
    </KeyboardAvoidingView>

  );
};

export default LoginPage;
{/* <ProdBold style={text.fz30}>{t('login.hny', {newyear: new Date().getFullYear(),})}</ProdBold> */ }
// const initials = userLog.username.split(' ').map((word) => word[0]).join('');
// return <View style={loginStyle.profile}><Avatar initials={initials} size={40} /></View>;


