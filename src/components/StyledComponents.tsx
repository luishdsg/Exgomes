import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, Pressable, StyleProp, ViewStyle, Text as DefaultText, TextInput as DefaultTextInput, ScrollView as DefaultScrollView, useColorScheme, View as DefaultView, ScrollView, TouchableOpacity, View, } from 'react-native';
import { Images, rowstyle, profileStyle, rootStyle, text } from '../style';
import { useThemeController } from '../style/Themed';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import { ScrollToTopButtonComponentProps } from '../interface/Props.interface';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../style/Colors';


interface ImageComponentProps {
  source: any;
}
interface TruncatedTextProps {
  content: string;
  maxSize: number;
  style?: object;
}

interface CircleCountCharactereProps {
  calculateBorderStyle: () => void;
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};
interface MenuOptionProfileProps {
  // onPressIn: () => void;
  // onPressOut: () => void;
  // style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

const TruncatedTextBold: React.FC<TruncatedTextProps> = ({ content, maxSize, style }) => {

  const truncateText = (content: string) => {
    if (content.length > maxSize) {
      return content.substring(0, maxSize) + '...';
    }
    return content;
  };

  return (
    <ProdBold style={[style]} >{truncateText(content)}</ProdBold>
  );
};


const CircleCountCharactere = ({ commentary }) => {
  const calculateBorderStyle = () => {
    const characterCount = commentary.length;
    const maxCharacters = 1000;

    const progress = Math.min(characterCount / maxCharacters, 1);
    const circumference = Math.PI * 180;

    return {
      strokeDasharray: circumference,
      strokeDashoffset: circumference * (1 - progress),
    };
  };
  const circleColor = commentary.length <= 199 ? colors.patternColor : colors.red;
  return (
    <View style={[rootStyle.alignCenter, rootStyle.Pabsolute,{}]}>
      <View style={[rootStyle.Prelative,{backgroundColor: 'transparent'}]}>
        <Svg height="50" width="50">
          <Circle
            cx="25"
            cy="25"
            r="18"
            stroke={circleColor}
            strokeWidth="5"
            fill="transparent"
            {...calculateBorderStyle()}
          />
        </Svg>
      </View>
    </View>
  )
}


const ScrollToTopButtonComponent: React.FC<ScrollToTopButtonComponentProps> = ({ sectionListRef, onPress }) => {
  const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
  const { t } = useTranslation();
  const handleScrollToTop = () => {
    onPress(null);
    if (sectionListRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      sectionListRef.current?.scrollToLocation({ sectionIndex: 0, itemIndex: 0, animated: false });
    }
  };

  return (
    <TouchableOpacity onPress={handleScrollToTop} style={{}}>
      <LottieView
        loop={true}
        autoPlay
        duration={7000}
        style={[
          {
            width: 140 * 0.7,
            height: 140 * 0.7,
          }]}
        source={require('../../assets/json/nomore.json')}
      />
      <View style={[rowstyle.row, rootStyle.centralize, rootStyle.my1, rootStyle.br100, rootStyle.px1, rootStyle.h40, { backgroundColor: themeGTD }]}>

        <LottieView
          loop={true}
          autoPlay
          duration={2000}
          style={[
            {
              width: 40 * 0.7,
              height: 40 * 0.7,
            }]}
          source={require('../../assets/json/moredata.json')}
        />
        <ProdRegular style={[{ color: themeBW }]}>{t('home.moredata')}</ProdRegular>
      </View>
    </TouchableOpacity>
  );
};



const LineiOSComponent: React.FC<any> = (props: any) => {
  return (
    <View  {...props} style={[{ ...props }, rootStyle.w100, rootStyle.centralize, { zIndex: 10 }]} >
      <View style={[rootStyle.lineIOS, {}]}></View>
    </View>
  );
};

const TruncatedTextRegular: React.FC<TruncatedTextProps> = ({ content, maxSize, style }) => {
  const truncateText = (content: string) => {
    if (content.length > maxSize) {
      return content.substring(0, maxSize) + '...';
    }
    return content;
  };

  return (
    <ProdRegular style={[style]} >{truncateText(content)}</ProdRegular>
  );
};

const ImageMediumComponent: React.FC<ImageComponentProps> = ({ source }) => {
  return (
    <Image source={source} style={Images.MediumImage} resizeMode="cover" />
  );
};
const ImageMaxComponent: React.FC<ImageComponentProps> = ({ source }) => {
  return (
    <Image source={source} style={Images.MaxImage} resizeMode="cover" />
  );
};
const ImageProfileComponent: React.FC<ImageComponentProps> = ({ source }) => {
  return (
    <Image source={source} style={Images.PostProfileIco} resizeMode="cover" />
  );
};

const ImageUserCommentComponent: React.FC<ImageComponentProps> = ({ source }) => {
  return (
    <Image source={source} style={Images.profileIcon} resizeMode="cover" />
  );
};
const ImageMinComponent: React.FC<ImageComponentProps> = ({ source }) => {
  return (
    <Image source={source} style={Images.MinImage} resizeMode="cover" />
  );
};
function ProdRegular(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'ProdRegular' }]} />;
}
function ProdThin(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'ProdThin' }]} />;
}
function ProdBold(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'ProdBold' }]} />;
}
function ProdLight(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'ProdLight' }]} />;
}

const MenuOptionProfile: React.FC<MenuOptionProfileProps> = ({
  children,
}) => {
  const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWD, themeBW, themeGTD, themeGLD, themeWID, themeWTD, Status, _toggleTheme } = useThemeController();
  // const scaleValue = useRef(new Animated.Value(1)).current;
  return (
    <Pressable>
      {({ pressed }) => (
        <Animated.View
          style={[
            rowstyle.row,
            rootStyle.centralize,
            profileStyle.pressableBtn,
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: themeWTD,
              transform: [
                {
                  scale: pressed ? .8 : 1,
                },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      )}
    </Pressable>
  );
};


export {
  ImageMediumComponent,
  TruncatedTextBold,
  TruncatedTextRegular,
  MenuOptionProfile,
  ImageMinComponent,
  ImageMaxComponent,
  ImageUserCommentComponent,
  ImageProfileComponent,
  ScrollToTopButtonComponent,
  LineiOSComponent,
  CircleCountCharactere,
  ProdRegular,
  ProdThin,
  ProdBold,
  ProdLight,
};

