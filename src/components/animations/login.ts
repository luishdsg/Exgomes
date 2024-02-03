import { useEffect, useRef } from 'react';
import {Animated }from 'react-native';

export const useFadeAnimationLogin = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  return { fadeAnim, fadeIn, fadeOut };
};
