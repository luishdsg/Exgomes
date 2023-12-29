import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en-us.json';
import pt from './pt-br.json';

export const language = {
  en: {translation: en},
  pt: {translation: pt},
};
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'pt',
  fallbackLng: 'pt',
  resources: language,
});

export default i18next;