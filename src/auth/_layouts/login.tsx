import { API_URL } from '@env';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Switch } from 'react-native-ios-kit';
import Icon from 'react-native-vector-icons/Octicons';
import { ImageMediumComponent, ImageMinComponent, ProdBold, ProdLight, ProdRegular } from '../../components/StyledComponents';
import { useFadeAnimationLogin } from '../../components/animations/login';
import ForgotPassModal from '../../components/modal/ForgotPassModal';
import PopUpError from '../../components/modal/PopUpError';
import { useThemeController } from '../../constants/Themed';
import { LoginUserReq, UserReq, UserRes } from '../../interface/User.interface';
import { loginStyle, rootStyle, text } from '../../style';
import { colors } from '../../style/Colors';
import { useAuth } from '../services/AuthService';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
  const [avatarUser, setAvatarUser] = useState<UserRes | null>(null);
  const [usernameExists, setUsernameExists] = useState(false);
  const { onLogin, onSignUp } = useAuth();
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [lang, setLang] = useState(language);
  const { themeWB, themeWTD, themeGTD, themeBWI, themeBW, themeWIB, themeWITD, themeDGL, themePG, Status, _toggleTheme } = useThemeController();
  const keyboardVerticalOffset = Platform.OS === 'android' ? -350 : 0;


  // Define o estilo da barra de status com base no tema

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/users/${username}`);
        setAvatarUser(result.data);
        setTimeout(() => {
          setUsernameExists(result.data.username)
        }, 1000);

      } catch (error) {
        setAvatarUser(null);
        setUsernameExists(false);
      }
    };
    if (username.length >= 3) getUser();
    else setAvatarUser(null);
  }, [username]);

  const renderAvatarContent = () => {

    if (avatarUser && avatarUser?.photo) {
      return <Animated.View style={[loginStyle.profile]}><Avatar url={avatarUser?.photo} size={40} /></Animated.View>;
    } else if (avatarUser && avatarUser.username) {
      const initials = avatarUser.username.split(' ').map((word) => word[0]).join('');
      return <View style={loginStyle.profile}><Avatar initials={initials} size={40} /></View>;
    } else {
      return null;
    }

  };


  const _handlerChangeLanguage = () => {
    const newLang = lang === 'pt' ? 'pt' : 'en'
    changeLanguage(newLang);
    setLang(newLang)
  }

  const vibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const clearInput = () => {
    setUsername('');
    vibrate();
  };

  const _handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const { fadeAnim: fadeAnimUsername, fadeIn: fadeInUsername, fadeOut: fadeOutUsername } = useFadeAnimationLogin();
  const { fadeAnim: fadeAnimPassword, fadeIn: fadeInPassword, fadeOut: fadeOutPassword } = useFadeAnimationLogin();

  const _handleNextInput = (nextInputRef: any) => {
    if (nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  const _handleLogin = async () => {
    try {
      const login: LoginUserReq = {
        username: username,
        password: password,
      }
      setIsLoadingLogin(true);
      if (username.trim() === '') {
        setIsUsernameEmpty(true);
        setTimeout(() => { setIsUsernameEmpty(false); }, 2000);
        fadeInUsername(); vibrate();
      } else {
        setIsUsernameEmpty(false);
        fadeOutUsername();
      }
      if (password.trim() === '') {
        setTimeout(() => { setIsPasswordEmpty(false); }, 2000);
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
      setillustrationError('https://i.ibb.co/4JMjJMw/Sem-t-tulo.png')
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

      if (usernameExists) {
        setErrorMessage(t('login.userexist', { userexist: username }));
        setillustrationError('https://i.ibb.co/TcV2dRb/ill-02.png')
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
      setillustrationError('https://i.ibb.co/VJSh8vQ/ill-04.jpg')
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
    setIsEnabled(previousState => !previousState);
    _toggleTheme();
  }


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
            <ImageMediumComponent source={require('../../../assets/img/ill-01.png')} />
            <ImageMinComponent source={require('../../../assets/icon.png')} />
          </View>
          <View style={[rootStyle.p1, rootStyle.centralize]}>
            <ProdBold style={[text.fz30, text.centralizeText, { color: themeBWI }]}>{t('login.title')}</ProdBold>
            <ProdRegular style={[text.fz20, text.centralizeText, rootStyle.mt02, text.fontBold, { color: themeGTD }]}>{t('login.subtitle')}</ProdRegular>
          </View>
          <View style={[rootStyle.halfview]}>
            <Animated.Text style={[rootStyle.errorMessage, { opacity: fadeAnimUsername }]}>
              {t('Tools.userEmpty')}
            </Animated.Text>
            <View style={[loginStyle.inputContainer, rootStyle.h50, { backgroundColor: themeWB }]}>
              <TextInput
                style={[loginStyle.input, rootStyle.h50, text.fz20, isUsernameEmpty && rootStyle.inputError, { color: themeBWI }]}
                placeholder={t('Tools.inputUser')}
                placeholderTextColor={colors.gray}
                value={username} editable={true}
                contextMenuHidden={false}
                returnKeyType="next"
                onSubmitEditing={() => { _handleNextInput(inputRefPass) }}
                onChangeText={(text) => { setUsername(text); setIsUsernameEmpty(false) }}
              />
              {username.length > 0 && (
                <TouchableOpacity style={[rootStyle.mx1, rootStyle.h50, rootStyle.centralize, { position: 'absolute', top: -1, right: 0, }]} onPress={clearInput}>
                  <EvilIcons name="close" color={themeBW} size={24} themeText />
                </TouchableOpacity>
              )}
              {renderAvatarContent()}
            </View>
            <View style={[loginStyle.inputContainer, rootStyle.h50, { backgroundColor: themeWB }]}>
              <TextInput
                style={[loginStyle.input, rootStyle.h50, text.fz20, isPasswordEmpty && rootStyle.inputError, { color: themeBWI }]}
                placeholder={t('Tools.inputPass')}
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
              {t('Tools.passEmpty')}
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