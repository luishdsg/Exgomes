import React from 'react';
import AppRoutes from './src/routes/Routes';
import 'react-native-gesture-handler';
import { LogBox, } from 'react-native';
export default function App() {
  LogBox.ignoreLogs(['source.uri should not be an empty string']);
  LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
  return <><AppRoutes /></>;
}