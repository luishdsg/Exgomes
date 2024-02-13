import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParamList";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ScrollView, SectionList } from "react-native";
import { UserRes } from "../base/User.base";
import { PostRes } from "../base/Post.base";

export interface storeProps {
  Id: string;
  Blocked: Array<string>;
  Favorites: Array<string>;
  Followers: Array<string>;
  Following: Array<string>;
  Hated: Array<string>;
  Username: string;
  Posts: Array<string>;
  Photo: string;
  Saved: Array<string>;
  Trash: Array<string>;
  Email: string;
  Verified: boolean;
  Birth: Date;
  Local: string;
  Lang: string;
  token: string;
  theme: string;
  // onLoadTimeLineHome: boolean
}
export interface PopUpErrorProps {
  visible?: boolean;
  errorMessage?: string;
  username: string;
  image: string;
  onClose: () => void;
}

export interface TimeLineProps {
  item: { post: PostRes; user: UserRes; };
  _refreshPage: () => void;
  unfollowList: (updateFunction: (prevList: SectionDataTimeLineProps[]) => SectionDataTimeLineProps[]) => void;
  unSaveList: () => void;
}

export interface ReactBtnTimeLineProps {
  onPress: () => void;
}


export interface GroupedPosts {
  id: string;
  user: UserRes;
  posts: PostRes[];
};
export interface CommentsPostProps {
  onClose: () => void;
  post: PostRes;
}

export type ReactButtonsPostProps = {
  // navigation: NavigationProp<RootStackParamList, 'CommentsPost'>
  post: PostRes;
  onPress: () => void;
  unfollowList: () => void;
  unSaveList: () => void;
};
export interface HateIconProps {
  color: string;
}
export interface ProfileViewsProps {
  user: storeProps;
}

export type SectionDataTimeLineProps = {
  title: string;
  data: Array<{ post: PostRes; user: UserRes }>;
};

export interface FavoritesScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Favorite'>;
  onLoad: boolean;
}

export interface UserAuth {
  userAuth: UserRes;
  token: string;
}

export interface SettingsPostModalProps {
  onClose: () => void;
  author: UserRes;
  followUnfollow: () => void;
  isUserFollowing: Promise<boolean>;
  post: PostRes
}

export interface ScrollToTopButtonComponentProps {
  sectionListRef: React.RefObject<SectionList>
  onPress: (page: number) => void;
}

export interface InputSendCommentaryProps {
  _createCommentary: () => void;
  setCommentary: (value: React.SetStateAction<string>) => void;
  storeAuth: storeProps;
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

export interface CommentsTimeLineProps {
  onClose: () => void;
  post: PostRes;
}

export type ReactButtonsTimeLineProps = {
  // navigation: NavigationProp<RootStackParamList, 'CommentsPost'>
  post: PostRes;
  onPress: () => void;
  unfollowList: () => void;
  unSaveList: () => void;
};

export type TimeLineHomeProps = {
  // navigation: RouteProp<RootStackParamList, 'Feed'>;
  // data: {
  //   username: string;
  //   token: string
  // },
  route: RouteProp<RootStackParamList, 'Feed'>;
  onLoading: React.ReactNode;
};

// export type HomeScreenPageProps = {
//   navigation: StackNavigationProp<RootStackParamList, 'Feed'>;
//   route: RouteProp<RootStackParamList, 'Feed'>;
//   children: React.ReactNode;
// };

export type BlockedScreenPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Blocked'>;
};
