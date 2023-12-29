export const colors = {
  whiteIce: '#ecedf2',
  grayText: '#ccc',
  gray: '#ACACAC',
  patternColor: '#2f95dc',
  black: '#000',
  white: '#fff',
}
export const themeAvatar = {
  primaryColor: 'tomato',
  primaryLightColor: 'red',
  disabledColor: 'yellow',
};
export default {
  light: {
    text: colors.black,
    background: colors.white,
    tint: colors.patternColor,
    tabIconDefault: colors.grayText,
    tabIconSelected: colors.patternColor,
  },
  dark: {
    text: colors.grayText,
    background: colors.black,
    tint: colors.patternColor,
    tabIconDefault: colors.grayText,
    tabIconSelected: colors.patternColor,
  },
};
