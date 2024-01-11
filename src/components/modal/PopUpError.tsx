// PopUpError.tsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, TouchableOpacity, View } from 'react-native';
import { PopUpErrorProps } from '../../interface/Props.interface';
import { popUpStyle, rootStyle, rowstyle, text } from '../../style';
import { colors } from '../../style/Colors';
import { ProdBold, TruncatedTextBold } from '../StyledComponents';


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
              backgroundColor: colors.bege,
              flexDirection: 'column',
            },
          ]}>
          <View style={[rootStyle.w100, rootStyle.centralize, { paddingRight: 16 }]}><View style={[rootStyle.lineIOS, {}]}></View></View>
          <View style={[rowstyle.row, rootStyle.justifyCenter, { height: '97%' }]}>
            <View style={[rowstyle['3col'], rootStyle.justifyCenter, {}]}>
              <TruncatedTextBold content={username} maxSize={20} style={[text.fz30, text.leftText, { color: colors.black }]} />
              <ProdBold style={[text.fz25, text.leftText, { color: colors.textDark }]}>{errorMessage}</ProdBold>
            </View>
            <View style={[rowstyle['4col'], rootStyle.justifyEnd, {}]}>
              <Image style={[{ width: '100%', height: '100%', position: 'absolute', right: -45, bottom: 0 }]} resizeMode="contain" source={{ uri: image }} />
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>


  );
};
export default PopUpError;
