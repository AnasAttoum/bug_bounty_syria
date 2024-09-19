import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import styles from './styles/signUp.module.css'

import '@mantine/core/styles.css';
import { createTheme, Input, MantineProvider } from '@mantine/core';


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
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
