export const colors = {
  whiteIce: '#ecedf2',
  white: '#fff',
  grayText: '#ccc',
  gray: '#ACACAC',
  whiteOp: '#c5c5c5',
  grayLight: '#DFDFDF',
  patternColor: '#2f95dc',
  textDark: '#464646',
  dark: '#181818',
  black: '#000',
  orange: '#FF7700',
  blackOp: '#000000c4',
  blackOps: '#00000075',
  red: '#FF3C3C',
  redOp: '#9300008c',
  pink: '#FF479D',
  purple: '#8837FF',
  purpleBlack: '#7e2eff38',
  purpleWhite: '#7e2eff6e',
  blue: '#006FFF',
  green: '#89FF00',
  bege: '#f5f5dc',
  yellow: '#E2D300',
}

export const params = {
  dark: 'dark',
  light: 'light',
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