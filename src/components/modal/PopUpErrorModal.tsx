// PopUpError.tsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, TouchableOpacity, View } from 'react-native';
import { PopUpErrorProps } from '../../interface/Props.interface';
import { popUpStyle, rootStyle, rowstyle, text } from '../../style';
import { colors } from '../../style/Colors';
import { ProdBold, ProdRegular, ProdThin, TruncatedTextBold } from '../StyledComponents';
import { BlurView } from 'expo-blur';


const PopUpError: React.FC<PopUpErrorProps> = ({ visible, username, errorMessage, onClose, image }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { t, i18n: { changeLanguage, language } } = useTranslation();

  Animated.timing(translateY, {
    toValue: visible ? 1 : 0,
    duration: 500,
    useNativeDriver: true,
  }).start();
  Animated.timing(opacity, {
    toValue: visible ? 1 : 0,
    duration: 0,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={[
        popUpStyle.container,
        {
          top: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [900, 0],
              }),
            },
          ],
        },
      ]}
    >
      <BlurView style={[popUpStyle.container, { top: 0 }]} intensity={30}>
        <TouchableOpacity style={{
          maxHeight: 200,
          height: '30%',
          position: 'absolute',
          width: '100%',
          bottom: 0,
          left: 0,
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
        }} onPress={onClose}>

          <Animated.View
            style={[
              popUpStyle.body,
              popUpStyle.container,
              {
                backgroundColor: colors.white,
                flexDirection: 'column',
              },
            ]}>
            <View style={[rootStyle.w100, rootStyle.centralize, rootStyle.Pabsolute, rootStyle.p16, { zIndex: 10 }]}><View style={[rootStyle.lineIOS, {}]}></View></View>
            {errorMessage == `${t('login.userexist', { userexist: username })}` && (
              <View style={[rowstyle.row, rootStyle.justifyCenter, popUpStyle.content, { height: '97%', }]}>
                <View style={[rowstyle['3col'], rootStyle.justifyCenter, {}]}>
                  <TruncatedTextBold content={username} maxSize={20} style={[text.fz30, text.leftText, { color: colors.black }]} />
                  <ProdBold style={[text.fz25, text.leftText, { color: colors.textDark }]}>{errorMessage}</ProdBold>
                </View>
                <View style={[rowstyle['4col'], rootStyle.justifyEnd, {}]}>
                  <Image style={[{ width: '100%', height: '100%', position: 'absolute', right: -45, bottom: 0 }]} resizeMode="contain" source={{ uri: `${image}` }} />
                </View>
              </View>
            )}
            {errorMessage == `${t('login.errorserver')}` && (
              <View style={[rowstyle.row, rootStyle.justifyCenter, rootStyle.borderTop, { height: '100%', backgroundColor: colors.red }]}>
                <Image style={[rootStyle.backgroundImage, rootStyle.borderTop, {}]} source={{ uri: `${image}` }} />
                <View style={[rootStyle.w100, rootStyle.centralize, rootStyle.justifyStart, rootStyle.Pabsolute, { bottom: 0, height: 90, backgroundColor: 'transparent' }]}>
                  <ProdBold style={[text.fz25, text.leftText, text.centralizeText, text.shadow, { color: colors.white }]}>{errorMessage}</ProdBold>
                </View>
              </View>
            )}
            {errorMessage == `${t('login.incorrectLogin')}` && (
              <View style={[rowstyle.row, rootStyle.centralize, rootStyle.p16, { height: '97%', }]}>
                <View style={[rowstyle['1col'], rootStyle.justifyCenter, { zIndex: 10 }]}>
                  <ProdBold style={[text.fz25, text.leftText, { color: colors.black }]}>{errorMessage}</ProdBold>
                </View>
                <Image style={[{ width: '100%', height: '100%', position: 'absolute', right: '-20%', bottom: 0, }]} resizeMode="contain" source={{ uri: `${image}` }} />
              </View>
            )}

          </Animated.View>
        </TouchableOpacity>

      </BlurView>


    </Animated.View>


  );
};
export default PopUpError;
