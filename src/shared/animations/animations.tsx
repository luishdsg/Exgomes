import { useEffect, useRef } from 'react';
import {Animated }from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useFadeAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeHide = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(0);
    });
  };


  const fadeInHide = () => {
    Animated.timing(fadeHide, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

  };
  const fadeOutHide = () => {
    Animated.timing(fadeHide, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

  };

  return { 
    fadeAnim, 
    fadeHide, 
    fadeIn, 
    fadeOut,
    fadeInHide, 
    fadeOutHide,
  
  };
};




export const animate1500ms = {duration: 1500,easing: Easing.bezier(0.5, 0.01, 0, 1),};
