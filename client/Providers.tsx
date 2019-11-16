import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import theme from './constants/theme';
import { DataProvider } from './utils/context';

function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>{children}</DataProvider>
    </ThemeProvider>
  );
}

export default Providers;
