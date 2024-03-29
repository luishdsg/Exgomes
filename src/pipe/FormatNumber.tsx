import { useTranslation } from "react-i18next";

export const formatNumber = (value: number, t: (key: string) => string) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + `${t('post.millions')}`; 
    } else if (value >= 10000) {
      return (value / 1000).toFixed(0) + `${t('post.thousands')}`;
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + `${t('post.thousands')}`;
    } else {
      return value;
    }
  };