import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../style/Colors';

export const useThemeController = () => {
  const [theme, setTheme] = useState('dark');



  const colorScheme = useColorScheme();

  const themeWB = colorScheme === theme ? colors.white : colors.black;
  const themeWTD = colorScheme === theme ? colors.white : colors.textDark;
  const themeGTD = colorScheme === theme ? colors.gray : colors.textDark;
  const themeTDG = colorScheme === theme ? colors.textDark : colors.gray;
  const themeTDW = colorScheme === theme ? colors.textDark : colors.white;
  const themeTDWI = colorScheme === theme ? colors.textDark : colors.whiteIce;
  const themeTDWO = colorScheme === theme ? colors.whiteOp : colors.textDark;
  const themeTDD = colorScheme === theme ? colors.textDark : colors.dark;
  const themeTDGT = colorScheme === theme ? colors.textDark : colors.grayText;
  const themeGLTD = colorScheme === theme ? colors.grayLight : colors.textDark;
  const themeBWI = colorScheme === theme ? colors.black : colors.whiteIce;
  const themeBW = colorScheme === theme ? colors.black : colors.white;
  const themeWIB = colorScheme === theme ? colors.whiteIce : colors.black;
  const themeWID = colorScheme === theme ? colors.whiteIce : colors.dark;
  const themeWITD = colorScheme === theme ? colors.whiteIce : colors.textDark;
  const themeGLD = colorScheme === theme ? colors.grayLight : colors.dark;
  const themeDG = colorScheme === theme ? colors.dark : colors.gray;
  const themeGD = colorScheme === theme ? colors.gray : colors.dark;
  const themeFollow = colorScheme === theme ? colors.purpleWhite : colors.purpleBlack;
  const themeOpacityBW = colorScheme === theme ? colors.blackOp : colors.whiteOp;
  const themeOpacityWB = colorScheme === theme ? colors.whiteOp : colors.blackOp;
  const themePG = colorScheme === theme ? colors.patternColor : colors.gray;
  const themeStatus = colorScheme === theme ? 'dark' : 'light';
  function Status() {
    return <StatusBar style={themeStatus} />
  }

  const _toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('chegou theme >' + newTheme + ' tambem ')
    setTheme(newTheme);
  };

  return { themeWB, themeGD, themeTDWO, themeGLTD, themeFollow ,themeWID,themeOpacityWB, themeOpacityBW, themeTDWI, themeWTD,themeTDW,themeTDG,themeTDD,themeTDGT,themeDG, themeGTD,themeBWI ,themeBW,themeWIB , themeWITD,themeGLD , themePG,  themeStatus, Status, _toggleTheme };
};
