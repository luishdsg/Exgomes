import React, { ReactNode, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Images, rowstyle, profileStyle, rootStyle, text } from '../style';
import { Text as DefaultText, TextInput as DefaultTextInput, ScrollView as DefaultScrollView, useColorScheme, View as DefaultView, } from 'react-native';
import { useThemeController } from '../constants/Themed';
import { colors } from '../style/Colors';

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
  const scaleValue = useRef(new Animated.Value(1)).current;
  const { themeWTD} = useThemeController();
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
                  scale: pressed ? .8: 1,
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
  MenuOptionProfile,
  ImageMinComponent,
  ImageMaxComponent,
  ProdRegular,
  ProdThin,
  ProdBold,
  ProdLight,
};

