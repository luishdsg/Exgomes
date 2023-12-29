import axios from 'axios';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Keyboard, KeyboardAvoidingView, ScrollView, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-ios-kit';
import { ImageMediumComponent, TextBold } from '../../components/StyledComponents';
import LoginErrorModal from '../../components/modal/ModalLogin';
import { LoginUserReq, UserReq, UserRes } from '../../interface/User.interface';
import { loginStyle, rootStyle, text } from '../../style';
import { API_URI, useAuth } from '../services/AuthService';
import { colors } from '../../constants/Colors';


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [avatarUser, setavatarUser] = useState<UserRes | null>(null);
  const { onLogin, onSignUp } = useAuth();
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [lang, setLang] = useState(language);
  const [animationVisible, setAnimationVisible] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(`${API_URI}users/${username}`);
        console.log(result.data);
        setavatarUser(result.data)
      } catch (error) {
        setavatarUser(null);
      }
    };
    if (username.length >= 3) setTimeout(() => {getUser()},1000) ;
    else setavatarUser(null);
  }, [username]);

  const renderAvatarContent = () => {
    // if (avatarUser && avatarUser?.photo) {
    // } else if (avatarUser && avatarUser.username) {
    //   const initials = avatarUser.username.split(' ').map((word) => word[0]).join('');
    //   return <View style={loginStyle.profile}><Avatar initials={initials} size={40} theme={colors.patternColor}/></View>;
    // } else {
    //   return null;
    // }
    return <View style={loginStyle.profile}><Avatar url={avatarUser?.photo} size={40}/></View>;

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

  const _handleLogin = async () => {
    try {
      const login: LoginUserReq = {
        username: username,
        password: password,
      }
      const user = await onLogin!(login);
      if (user! && user.error) {
        alert(user.msg)
      }
    } catch (error) {
      setErrorMessage(`${error}Senha incorreta`);
      setErrorModalVisible(true);
    }
  };

  const _handleSignUp = async () => {
    try {
      const signUp: UserReq = {
        username: username,
        password: password,
      }
      const user = await onSignUp!(signUp);
      if (user! && user.error) {
        alert(user.msg)
      } else {
        _handleLogin();
      }
    } catch (error) {
      setErrorMessage(`${error}Senha incorreta`);
      setErrorModalVisible(true);
    }
  }

  return (
    <KeyboardAvoidingView
      style={loginStyle.container}
      behavior="padding"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={loginStyle.form}>
            <View style={loginStyle.loginImage}>
              <ImageMediumComponent source={require('../../../assets/img/ill-01.png')} />
            </View>
            <View style={[rootStyle.px1, rootStyle.centralize, rootStyle.col]}>
              <TextBold style={[text.fz30, rootStyle.centralizeText]}>{t('login.title')}</TextBold>
              <TextBold style={[text.fz20, rootStyle.centralizeText, rootStyle.textGray, rootStyle.mt02]}>{t('login.subtitle')}</TextBold>
            </View>
            <View style={loginStyle.inputContainer}>
              <TextInput
                style={[loginStyle.input, text.fz20]}
                placeholder={t('Tools.inputUser')}
                value={username} editable={true}
                contextMenuHidden={false}
                onChangeText={setUsername}
              />
              {renderAvatarContent()}
            </View>

            <View style={loginStyle.inputContainer}>
              <TextInput
                style={[loginStyle.input, text.fz20]}
                placeholder={t('Tools.inputPass')}
                value={password} editable={true}
                onChangeText={setPassword} onFocus={_handleAnimationStart}
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
            <View style={loginStyle.buttonArea}>
              <Button title="Login" onPress={_handleLogin} />
              <Button title="SignUp" onPress={_handleSignUp} />
            </View>
          </View>
          <LoginErrorModal
            visible={errorModalVisible}
            errorMessage={errorMessage}
            onClose={() => setErrorModalVisible(false)}
          />
        </ScrollView >
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
{/* <TextBold style={text.fz30}>{t('login.hny', {
  newyear: new Date().getFullYear(),
})}</TextBold> */}