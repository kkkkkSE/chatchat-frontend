// eslint-disable-next-line import/no-extraneous-dependencies
import { render as originalRender } from '@testing-library/react';

import type React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import defaultTheme from './styles/defaultTheme';

// eslint-disable-next-line import/prefer-default-export
export function render(element: React.ReactElement) {
  return originalRender((
    <MemoryRouter initialEntries={['/']}>
      <ThemeProvider theme={defaultTheme}>
        {element}
      </ThemeProvider>
    </MemoryRouter>
  ));
}
