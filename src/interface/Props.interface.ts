import { StackNavigationProp } from "@react-navigation/stack";
import { UserRes } from "./User.interface";
import { RootStackParamList } from "./RootStackParamList";
import { NavigationProp } from "@react-navigation/native";

export interface PopUpErrorProps {
  visible?: boolean;
  errorMessage?: string;
  username: string;
  image: string;
  onClose: () => void;
}

export interface ReactBtnPostProps {
  onPress: () => void;
}

export interface HateIconProps {
  color: string;
}
export interface ProfileViewsProps {
  user: UserRes | null;
  
}
export interface ZoomableImageProps {
  uri: string;
  onClose: () => void;
  fadeInOut: (arg0: boolean) => void;
}
export interface CommentsPostProps {
  onClose: () => void;
}
export type ReactButtonsPostProps =  NavigationProp<RootStackParamList, 'CommentsPost'>;