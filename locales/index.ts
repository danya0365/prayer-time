import { Language, Translations } from '../types/translation';
import { en } from './en';
import { th } from './th';
import { ar } from './ar';

export const translations: Record<Language, Translations> = {
  en,
  th,
  ar
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};

export * from './en';
export * from './th';
export * from './ar';
