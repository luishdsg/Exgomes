import { CommonActions, useNavigation } from "@react-navigation/native";
import * as Haptics from 'expo-haptics';

export const goBack = () => {
    const navigation = useNavigation();
      navigation.dispatch(CommonActions.goBack());
  };
  
  export const vibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  export const _handleNextInput = (nextInputRef: any) => {
    if (nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };
