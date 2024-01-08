// navigationService.ts

import { CommonActions, useNavigation } from '@react-navigation/native';

export const goBack = () => {
  const navigation = useNavigation();
    navigation.dispatch(CommonActions.goBack());
};
