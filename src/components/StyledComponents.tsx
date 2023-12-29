import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { Text, TextProps } from '../constants/Themed';
import { Images } from '../style';

interface ImageComponentProps {
  source: ImageSourcePropType;
}

const ImageMediumComponent: React.FC<ImageComponentProps> = ({ source }) => {
  return (
      <Image source={source} style={Images.MediumImage} resizeMode="cover" />
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


export {
  ImageMediumComponent,
  TextRegular,
  TextThin,
  TextBold,
  TextLight,
};

