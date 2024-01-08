export const colors = {
  whiteIce: '#ecedf2',
  white: '#fff',
  grayText: '#ccc',
  gray: '#ACACAC',
  grayLight: '#DFDFDF',
  patternColor: '#2f95dc',
  textDark: '#464646',
  dark: '#181818',
  black: '#000',
  orange: '#FF7700',
  red: '#FF3C3C',
  pink: '#FF479D',
  purple: '#8837FF',
  blue: '#006FFF',
  green: '#89FF00',
  bege: '#f5f5dc',
  yellow: '#E2D300',
}
export const themeAvatar = {
  primaryColor: 'tomato',
  primaryLightColor: 'red',
  disabledColor: 'yellow',
};

 
export default {
  light: {
    text: colors.black,
    writeTheme: colors.textDark,
    background: colors.white,
    tint: colors.patternColor,
    tabIconDefault: colors.grayText,
    tabIconSelected: colors.patternColor,
  },
  dark: {
    text: colors.white,
    writeTheme: colors.whiteIce,
    background: colors.black,
    tint: colors.patternColor,
    tabIconDefault: colors.grayText,
    tabIconSelected: colors.patternColor,
  },
};