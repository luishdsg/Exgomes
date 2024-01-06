// import { Text as DefaultText, TextInput as DefaultTextInput, ScrollView as DefaultScrollView, useColorScheme, View as DefaultView, } from 'react-native';

// import Colors from '../style/Colors';

// type ThemeProps = {
//   lightColor?: string;
//   darkColor?: string;
// };

// export type TextProps = ThemeProps & DefaultText['props'];
// export type ViewProps = ThemeProps & DefaultView['props'];
// export type TextInputProps = ThemeProps & DefaultTextInput['props'];
// export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];

// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.dark & keyof typeof Colors.light
// ) {
//   const theme = useColorScheme() ?? 'light';
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   } 
// }

// export function Text(props: TextProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

//   return <DefaultText style={[{ color }, style]} {...otherProps} />;
// }

// export function View(props: ViewProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

//   return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
// }

// export function TextInput(props: TextInputProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

//   return <DefaultTextInput style={[{ backgroundColor }, style]} {...otherProps} />;
// }
// export function ScrollView(props: ScrollViewProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

//   return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
// }


import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../style/Colors';
import { StatusBar } from 'expo-status-bar';

export const useThemeController = () => {
  const [theme, setTheme] = useState('');
  const colorScheme = useColorScheme();

  const themeText =
    colorScheme === theme ? { color: colors.white } : { color: colors.black };
  const themeLabel =
    colorScheme === theme ? { color: colors.white } : { color: colors.textDark };
  const themeTitle =
    colorScheme === theme ? { color: colors.gray } : { color: colors.textDark };
  const themeView =
    colorScheme === theme ? { backgroundColor: colors.black } : { backgroundColor: colors.whiteIce };
  const themeViewWhite =
    colorScheme === theme ? { backgroundColor: colors.black } : { backgroundColor: colors.white };
  const Theme =
    colorScheme === theme ? colors.whiteIce : colors.black;
  const ThemeDark =
    colorScheme === theme ? colors.gray : colors.textDark;
  const ThemeStatus =
    colorScheme === theme ? 'light' : 'dark';
  function Status() {
    return <StatusBar style={ThemeStatus} />
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('chegou theme > ' + ThemeStatus)
    setTheme(newTheme);
  };

  return { themeText, Theme, themeView, themeLabel, Status, ThemeStatus, themeViewWhite, ThemeDark, themeTitle, toggleTheme };
};
