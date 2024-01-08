import React from 'react';
import AppRoutes from './src/routes/Routes';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
export default function App() {
  LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);
  return <><AppRoutes /></>;
}