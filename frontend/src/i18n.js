// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationAz from "./locales/az/translation.json";
import translationEn from "./locales/en/translation.json";
import translationRu from "./locales/ru/translation.json";

const resources = {
  az: { translation: translationAz },
  en: { translation: translationEn },
  ru: { translation: translationRu },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
