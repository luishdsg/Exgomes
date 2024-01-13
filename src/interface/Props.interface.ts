import { UserRes } from "./User.interface";

export interface PopUpErrorProps {
    visible?: boolean;
    errorMessage?: string;
    username: string;
    image: string;
    onClose: () => void;
  }
  

  export interface ProfileViewsProps {
    user: UserRes | null;
  }