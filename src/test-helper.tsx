/* eslint-disable import/no-extraneous-dependencies */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as originalRender } from '@testing-library/react';

import type React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import defaultTheme from './styles/defaultTheme';

const queryClient = new QueryClient();

// eslint-disable-next-line import/prefer-default-export
export function render(element: React.ReactElement) {
  return originalRender((
    <MemoryRouter initialEntries={['/']}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          {element}
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  ));
}
