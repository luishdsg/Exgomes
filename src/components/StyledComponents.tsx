import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { Text, TextProps, View, ViewProps } from '../constants/Themed';
import { Images } from '../style';

interface ImageComponentProps {
  source: ImageSourcePropType;
}

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
function TextRegular (props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'ProdRegular' }]} />;
}
function TextThin (props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'ProdThin' }]} />;
}
function TextBold (props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'ProdBold' }]} />;
}
function TextLight (props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'ProdLight' }]} />;
}
function ViewFull (props: ViewProps) {
  return <View {...props} style={[props.style]}></View>;
}

export {
  ImageMediumComponent,
  ImageMinComponent,
  TextRegular,
  TextThin,
  TextBold,
  TextLight,
  ViewFull
};

