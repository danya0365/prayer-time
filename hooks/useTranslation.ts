import { useMemo } from 'react';
import { Language } from '../types/translation';
import { getTranslation } from '../locales';

interface UseTranslationProps {
  language: Language;
}

export const useTranslation = ({ language }: UseTranslationProps) => {
  const t = useMemo(() => getTranslation(language), [language]);
  
  return { t };
};

// Helper hook for getting nested translation values
export const useNestedTranslation = (language: Language) => {
  const { t } = useTranslation({ language });
  
  // Helper function to get nested values safely
  const getNestedValue = (path: string): string => {
    const keys = path.split('.');
    let value: unknown = t;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = (value as Record<string, unknown>)[key];
      } else {
        return path; // Return the path if translation not found
      }
    }
    
    return typeof value === 'string' ? value : path;
  };
  
  return { t, getNestedValue };
};
