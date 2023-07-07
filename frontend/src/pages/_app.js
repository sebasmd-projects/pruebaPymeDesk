import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme();

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
