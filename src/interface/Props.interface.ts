import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParamList";
import { NavigationProp } from "@react-navigation/native";
import { ScrollView, SectionList } from "react-native";
import { UserRes } from "../base/User.base";
import { PostRes } from "../base/Post.base";
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
  posts: PostRes[];
};


export interface HateIconProps {
  color: string;
}
export interface ProfileViewsProps {
  user: UserRes | null;
}

export type SectionDataPostProps = {
  title: string;
  data: Array<{ post: PostRes; user: UserRes }>;
};

export interface UserAuth {
    userAuth: UserRes;
    token: string;
}

export interface SettingsPostModalProps {
  onClose: () => void;
  author: UserRes;
  followUnfollow: () => void;
  isUserFollowing: boolean;
  post: PostRes
}

export interface ScrollToTopButtonComponentProps {
  sectionListRef: React.RefObject<SectionList>
  onPress: (page: number) => void;
}

export interface InputSendCommentaryProps {
  _createCommentary: () => void;
  setCommentary: (value: React.SetStateAction<string>) => void;
  userAuth: {
    userAuth: UserRes;
    token: string;
  };
  commentary: string;
  commentaryEmpty: boolean;
  t: (key: string) => string;
  loadCommentary: boolean;
}

export interface UserComments {
  _id: string;
  username: string;
  photo: string;
}

export interface ZoomableImageProps {
  uri: string;
  onClose: () => void;
  fadeInOut: (arg0: boolean) => void;
}
export interface CommentsPostProps {
  onClose: () => void;
  post: PostRes;
}
export type ReactButtonsPostProps = {
  // navigation: NavigationProp<RootStackParamList, 'CommentsPost'>
  post: PostRes;
  onPress: () => void;
};
export type PostHomeProps = {
  navigation: NavigationProp<RootStackParamList, 'CommentsPost'>;
  data: {
    username: string;
    token: string
  }
}
export type HomeScreenPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
export type BlockedScreenPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Blocked'>;
};
