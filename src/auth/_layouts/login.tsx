import axios from 'axios';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Animated, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-ios-kit';
import { ImageMediumComponent, ImageMinComponent, TextBold, TextLight } from '../../components/StyledComponents';
import { useFadeAnimationLogin } from '../../components/animations/login';
import ForgotPassModal from '../../components/modal/ForgotPassModal';
import PopUpError from '../../components/modal/PopUpError';
import { colors } from '../../style/Colors';
import { LoginUserReq, UserReq, UserRes } from '../../interface/User.interface';
import { loginStyle, rootStyle, text } from '../../style';
import { useAuth } from '../services/AuthService';
import { API_URL } from '@env';


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const inputRefPass = useRef(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
  const [animationVisible, setAnimationVisible] = useState(true);


  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/users/${username}`);
        setAvatarUser(result.data);
        setUsernameExists(!result.data);
      } catch (error) {
        setAvatarUser(null);
        setUsernameExists(false);
      }
    };
    if (username.length >= 3) setTimeout(() => { getUser() }, 1000);
    else setAvatarUser(null);
  }, [username]);

  const renderAvatarContent = () => {
    if (avatarUser && avatarUser?.photo) {
      return <View style={loginStyle.profile}><Avatar url={avatarUser?.photo} size={40} /></View>;
    } else if (avatarUser && avatarUser.username) {
      const initials = avatarUser.username.split(' ').map((word) => word[0]).join('');
      return <View style={loginStyle.profile}><Avatar initials={initials} size={40} /></View>;
    } else {
      return null;
    }

  };

  const _handleAnimationStart = () => {
    if (setPassword.length > 0) {
      setAnimationVisible(true);
      setTimeout(() => {
        setAnimationVisible(false);
      }, 40000);
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
      setErrorMessage(`Usuario ou Senha incorreto(a)${API_URL}`);
      setErrorModalVisible(true);
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
      } else {
        setIsUsernameEmpty(false);
        fadeOutUsername();
      }

      if (password.trim() === '') {
        setTimeout(() => { setIsPasswordEmpty(false); }, 2000);
        setIsPasswordEmpty(true);
        fadeInPassword();
      } else {
        setIsPasswordEmpty(false);
        fadeOutPassword();
      }

      if (usernameExists) {
        setErrorMessage('Nome de usuário já existente. Escolha outro.');
        setErrorModalVisible(true);
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
      setErrorMessage(`Error ao criar conta,\n seridor em análise ⌛ ${API_URL}`);
      setErrorModalVisible(true);
      setIsLoadingSignUp(false);
    }
  }

  const _handleForgotPass = async () => {
    setModalVisible(!modalVisible);
    setModalMessage("esqueceu a senha né")
  }


  return (
    <KeyboardAvoidingView
      style={loginStyle.container}
      behavior="padding"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={rootStyle.view}>
          <View style={loginStyle.loginImage}>
            <ImageMediumComponent source={require('../../../assets/img/ill-01.png')} />
            <ImageMinComponent source={require('../../../assets/icon.png')} />
          </View>
          <View style={[rootStyle.p1, rootStyle.centralize]}>
            <TextBold style={[text.fz30, rootStyle.centralizeText]}>{t('login.title')}</TextBold>
            <Text style={[text.fz20, rootStyle.centralizeText, rootStyle.textGray, rootStyle.mt02, text.fontBold]}>{t('login.subtitle')}</Text>
          </View>
          <View style={[rootStyle.halfview]}>
            <Animated.Text style={[rootStyle.errorMessage, { opacity: fadeAnimUsername }]}>
              {t('Tools.userEmpty')}
            </Animated.Text>
            <View style={loginStyle.inputContainer}>
              <TextInput
                style={[loginStyle.input, text.fz20, isUsernameEmpty && rootStyle.inputError]}
                placeholder={t('Tools.inputUser')}
                value={username} editable={true}
                contextMenuHidden={false}
                returnKeyType="next"
                onSubmitEditing={() => { _handleNextInput(inputRefPass) }}
                onChangeText={(text) => { setUsername(text); setIsUsernameEmpty(false) }}
              />
              {renderAvatarContent()}
            </View>
            <View style={loginStyle.inputContainer}>
              <TextInput
                style={[loginStyle.input, text.fz20, isPasswordEmpty && rootStyle.inputError]}
                placeholder={t('Tools.inputPass')}
                value={password} editable={true}
                ref={inputRefPass}
                returnKeyType="done"
                onSubmitEditing={() => { Keyboard.dismiss(); }}
                onChangeText={(text) => { setPassword(text); setIsPasswordEmpty(false) }}
                onFocus={_handleAnimationStart}
                secureTextEntry
              />
              {animationVisible && (
                <LottieView
                  loop
                  autoPlay
                  style={loginStyle.pass}
                  source={require('../../../assets/json/pass.json')}
                />
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
                  <TextBold style={[text.fz20, rootStyle.centralizeText, { color: colors.white }]}>{t('login.login')}</TextBold>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={[rootStyle.btnPatterpass, rootStyle.mt1, rootStyle.centralize]} onPress={_handleSignUp}>
                {isLoadingSignUp ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <TextBold style={[text.fz20, rootStyle.centralizeText, { color: colors.patternColor }]}>{t('login.signup')}</TextBold>
                )}
              </TouchableOpacity>
              <View style={[rootStyle.centralize, rootStyle.mt2]}>
                <TextLight onPress={_handleForgotPass} style={[rootStyle.centralizeText]}>━━━━━━  {t('login.forgotPass')}¯\_(ツ)_/¯  ━━━━━━</TextLight>
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
        visible={errorModalVisible}
        errorMessage={errorMessage}
        onClose={() => setErrorModalVisible(false)}
      />
    </KeyboardAvoidingView>

  );
};

export default LoginPage;
{/* <TextBold style={text.fz30}>{t('login.hny', {
  newyear: new Date().getFullYear(),
})}</TextBold> */}