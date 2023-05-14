import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';
// @ts-ignore
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import {TRANSLATE_RU} from "../locales/ru";
import {Dictionary} from "../locales/dictionary";

export const translations = {
  en: require('../locales/en.json'),
  ru: require('../locales/ru.json'),

};

export const translate = memoize(
  (key, config?) => i18n.t(key.replace(/\s/g, '_').replace(/\.+$/g, ''), config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const getTranslateMessage = (section: any, messages:any) => {

  let output:any[] = [];
  let keyMessages = [];
  let originalMessages:any[] = [];

  if(Array.isArray(messages)) {
    messages.map( (message:any) => {
      keyMessages.push(message.replace(/\s/g, '_').replace(/\.+$/g, ''));
      originalMessages.push(message);
    })
  } else {
      keyMessages.push(messages.replace(/\s/g, '_').replace(/\.+$/g, ''));
      originalMessages.push(messages);
  }

  keyMessages.map( (keyMessage, index) => {
    if(Dictionary[section]?.[keyMessage]) {
      output.push(translate(Dictionary[section][keyMessage]));
    } else {
      output.push(originalMessages[index]);
    }
  });
  //const keyMessage:any = message.replace(/\s/g, '_').replace(/\.+$/g, '');
  //if(Dictionary[domen]?.[keyMessage]) {
    //return translate(Dictionary[domen][keyMessage]);
  //}
  return output.join('. ');
}


export const setI18nConfig = async () => {
  // fallback if no available language fits
  const fallback = {languageTag: 'ru', isRTL: false};

  const {languageTag, isRTL} = fallback;
  //const {languageTag, isRTL} =
   // RNLocalize.findBestAvailableLanguage(Object.keys(translations)) || fallback;

  // clear translation cache
  // @ts-ignore
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  // @ts-ignore
  i18n.translations = {[languageTag]: translations[languageTag]};
  i18n.locale = languageTag;
  i18n.defaultLocale = 'ru';
};
