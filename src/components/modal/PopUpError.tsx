// PopUpError.tsx
import React, { useRef } from 'react';
import { Modal, View, Text, Button, TextStyle, ViewStyle, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../../style/Colors';
interface PopUpErrorProps {
  visible: boolean;
  errorMessage: string;
  onClose: () => void;
}

const PopUpError: React.FC<PopUpErrorProps> = ({ visible, errorMessage, onClose }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  Animated.timing(translateY, {
    toValue: visible ? 1 : 0,
    duration: 500,
    useNativeDriver: true,
  }).start();
  
  return (
    <Animated.View
      style={[
        styles.popupContainer,
        {
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0],
              }),
            },
          ],
        },
      ]}
    >
       <Text>{errorMessage}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text>Fechar Popup</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
// const modalContainerStyle: ViewStyle = {
//   justifyContent: 'center',
//   flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
//   alignItems: 'center',
// };

// const modalContentStyle: ViewStyle = {
//   justifyContent: 'center',
//   backgroundColor: colors.whiteIce,
//   padding: 20,
//   borderRadius: 10,
//   alignItems: 'center',
// };

export default PopUpError;
