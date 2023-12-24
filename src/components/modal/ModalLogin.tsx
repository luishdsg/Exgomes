// LoginErrorModal.tsx
import React from 'react';
import { Modal, View, Text, Button, TextStyle, ViewStyle } from 'react-native';

interface LoginErrorModalProps {
  visible: boolean;
  errorMessage: string;
  onClose: () => void;
}

const LoginErrorModal: React.FC<LoginErrorModalProps> = ({ visible, errorMessage, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={modalContainerStyle}>
        <View style={modalContentStyle}>
          <Text>{errorMessage}</Text>
          <Button
            title="Fechar"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const modalContainerStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle: ViewStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
};

export default LoginErrorModal;
