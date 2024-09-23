import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import styles from './styles/signUp.module.css'

import '@mantine/core/styles.css';
import { createTheme, Input, MantineProvider } from '@mantine/core';
import StoreProvider from './lib/StoreProvider.tsx'


import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import 'flag-icon-css/css/flag-icons.min.css'
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ar', 'de'],
    fallbackLng: "ar",
    detection: {
      order: ['cookie'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

const theme = createTheme({
  colors: {
    primary: ['var(--primary)', 'var(secondary)', '', '', '', '', '', '', '', ''],
  },
  components: {
    Input: Input.extend({
      classNames: {
        input: styles.input,
      },
    }),
  }
});

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <StrictMode>
      <MantineProvider theme={theme}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </MantineProvider>
    </StrictMode>
  </Suspense>,
)
