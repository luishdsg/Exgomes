import { StackNavigationProp } from "@react-navigation/stack";
import { UserRes } from "./User.interface";
import { RootStackParamList } from "./RootStackParamList";
import { NavigationProp } from "@react-navigation/native";
import { PubRes } from "./Pub.interface";
import { ScrollView, SectionList } from "react-native";

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

export interface GroupedPosts {
  id: string; 
    user: UserRes;
    posts: PubRes[];
  };


export interface HateIconProps {
  color: string;
}
export interface ProfileViewsProps {
  user: UserRes | null;
}

export type SectionDataPostProps = {
  title: string;
  data: Array<{ post: PubRes; user: UserRes }>;
};

export interface SettingsPostModalProps {
  onClose: () => void;
  followUnfollow: () => void;
  isUserFollowing: boolean;
  Ids: string
}

export interface ScrollToTopButtonComponentProps {
  sectionListRef: React.RefObject<SectionList>
  onPress: (page: number) => void;
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
export type PostHomeProps =  {
  navigation: NavigationProp<RootStackParamList, 'CommentsPost'>;
  data: {
    username: string;
    token: string
  }
}
export type HomeScreenPageProps = { 
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
