import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../../constants/Themed'; import Modal from 'react-native-modal';
import { BlurView } from 'expo-blur';
import { colors } from '../../style/Colors';
import { rootStyle } from '../../style';
import { ViewFull } from '../StyledComponents';

interface ForgotPassModalProps {
  visible: boolean;
  errorMessage: string;
  onClose: () => void;
}

const ForgotPassModal: React.FC<ForgotPassModalProps> = ({ visible, errorMessage, onClose }) => {
  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut" onBackdropPress={onClose} style={styles.modal}>
      <BlurView style={styles.absolute} intensity={40}>
        <View style={styles.modalContent}>
          <ViewFull style={[rootStyle.centralize]}>
            <ViewFull style={rootStyle.lineIOS}></ViewFull>
          </ViewFull>
          <Text>{errorMessage}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Fechar Modal</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  }, absolute: {
    position: 'absolute',
    justifyContent: 'flex-end',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContent: {
    zIndex: 1,
    backgroundColor: colors.whiteIce,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});


export default ForgotPassModal;