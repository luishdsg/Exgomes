import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { Images } from '../style';
import { Text as DefaultText, TextInput as DefaultTextInput, ScrollView as DefaultScrollView, useColorScheme, View as DefaultView, } from 'react-native';

interface ImageComponentProps {
  source: ImageSourcePropType;
}
interface TruncatedTextProps {
  content: string;
  maxSize?: number;
  style?: object;
}
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

const TruncatedTextBold: React.FC<TruncatedTextProps> = ({ content, maxSize = 20, style}) => {
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
const ImageMinComponent: React.FC<ImageComponentProps> = ({ source }) => {
  return (
      <Image source={source} style={Images.MinImage} resizeMode="cover" />
  );
};
function ProdRegular (props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'ProdRegular' }]} />;
}
function ProdThin (props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'ProdThin' }]} />;
}
function ProdBold (props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'ProdBold' }]} />;
}
function ProdLight (props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'ProdLight' }]} />;
}



export {
  ImageMediumComponent,
  ImageMinComponent,
  ProdRegular,
  ProdThin,
  ProdBold,
  ProdLight,
  TruncatedTextBold,
};

