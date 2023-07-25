/* eslint-disable import/no-extraneous-dependencies */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { render as originalRender } from '@testing-library/react';

import type React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { STATIC_ROUTES } from './constants/routes';

import defaultTheme from './styles/defaultTheme';

const queryClient = new QueryClient();

export function render(element: React.ReactElement) {
  return originalRender((
    <MemoryRouter initialEntries={[STATIC_ROUTES.HOME]}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          {element}
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  ));
}

export const mockIntersectionObserver = () => {
  const intersectionObserver = jest.fn();

  intersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  window.IntersectionObserver = intersectionObserver;
};
