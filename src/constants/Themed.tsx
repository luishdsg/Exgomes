import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../style/Colors';

export const useThemeController = () => {
  const [theme, setTheme] = useState('light');



  const colorScheme = useColorScheme();

  const themeWB = colorScheme === theme ? colors.white : colors.black;
  const themeWTD = colorScheme === theme ? colors.white : colors.textDark;
  const themeGTD = colorScheme === theme ? colors.gray : colors.textDark;
  const themeTDG = colorScheme === theme ? colors.textDark : colors.gray;
  const themeTDW = colorScheme === theme ? colors.textDark : colors.white;
  const themeTDWI = colorScheme === theme ? colors.textDark : colors.whiteIce;
  const themeTDD = colorScheme === theme ? colors.textDark : colors.dark;
  const themeTDGT = colorScheme === theme ? colors.textDark : colors.grayText;
  const themeGLTD = colorScheme === theme ? colors.grayLight : colors.textDark;
  const themeBWI = colorScheme === theme ? colors.black : colors.whiteIce;
  const themeBW = colorScheme === theme ? colors.black : colors.white;
  const themeWIB = colorScheme === theme ? colors.whiteIce : colors.black;
  const themeWITD = colorScheme === theme ? colors.whiteIce : colors.textDark;
  const themeGLD = colorScheme === theme ? colors.grayLight : colors.dark;
  const themeDG = colorScheme === theme ? colors.dark : colors.gray;
  const themeGD = colorScheme === theme ? colors.gray : colors.dark;
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

  return { themeWB, themeGD, themeGLTD ,themeOpacityWB, themeOpacityBW, themeTDWI, themeWTD,themeTDW,themeTDG,themeTDD,themeTDGT,themeDG, themeGTD,themeBWI ,themeBW,themeWIB , themeWITD,themeGLD , themePG,  themeStatus, Status, _toggleTheme };
};
