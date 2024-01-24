import React, { ReactNode, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, Pressable, StyleProp, ViewStyle, Text as DefaultText, TextInput as DefaultTextInput, ScrollView as DefaultScrollView, useColorScheme, View as DefaultView, ScrollView, TouchableOpacity, View, } from 'react-native';
import { Images, rowstyle, profileStyle, rootStyle, text } from '../style';
import { useThemeController } from '../constants/Themed';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import { ScrollToTopButtonComponentProps } from '../interface/Props.interface';


interface ImageComponentProps {
  source: any;
}
interface TruncatedTextProps {
  content: string;
  maxSize: number;
  style?: object;
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

const ScrollToTopButtonComponent: React.FC<ScrollToTopButtonComponentProps> = ({ scrollViewRef, onPress }) => {
  const { themeWB, themeTDG, themeTDWI, themeBWI, themeDG, themeWIB, themeBW, themeGTD, themeGLD, themePG, themeStatus, Status, _toggleTheme } = useThemeController();
  const { t } = useTranslation();
  const handleScrollToTop = () => {
    onPress(null);
    if (scrollViewRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  };

  return (
    <TouchableOpacity onPress={handleScrollToTop} style={{}}>
      <View  style={[rowstyle.row, rootStyle.centralize, rootStyle.my1, rootStyle.br100, rootStyle.px1, rootStyle.h40, { backgroundColor: themeGTD }]}>
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
  // const scaleValue = useRef(new Animated.Value(1)).current;
  const { themeWTD } = useThemeController();
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
  ImageProfileComponent,
  ScrollToTopButtonComponent,
  ProdRegular,
  ProdThin,
  ProdBold,
  ProdLight,
};

