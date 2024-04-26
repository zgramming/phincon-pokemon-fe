// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { Notifications } from '@mantine/notifications';
import { useMyPokemonStore } from '@/store/my-pokemon.store';
import { useEffect } from 'react';

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
        <Notifications position="top-right" transitionDuration={300} />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
