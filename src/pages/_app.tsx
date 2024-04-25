// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@/styles/globals.css';
import { createTheme, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';

const theme = createTheme({
  /** Put your mantine theme override here */
  // sync with tailwind breakpoints
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
