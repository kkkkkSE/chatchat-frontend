// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryRouter, RouterProvider } from 'react-router';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import routes from './routes';
import defaultTheme from './styles/defaultTheme';

const context = describe;

const setupRouterProvider = (path: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
};

describe('routes', () => {
  context('when the current path is “/”', () => {
    it('renders <HomePage />', () => {
      setupRouterProvider('/');

      screen.getByText(/회원 유형을 선택해주세요/);
    });
  });

  describe('when the current path is “/login”', () => {
    context('"/login" path with type', () => {
      it('renders <LoginPage />', () => {
        const type = 'company';

        setupRouterProvider(`/login?type=${type}`);

        screen.getByLabelText(/아이디/);
        screen.getByRole('button', { name: /로그인/ });
      });
    });

    context('"/login" path without type', () => {
      it('renders <HomePage />', () => {
        setupRouterProvider('/login');

        screen.getByText(/회원 유형을 선택해주세요/);
      });
    });
  });

  context('when the current path is “/sign-up', () => {
    it('renders <SignUpPage />', () => {
      setupRouterProvider('/sign-up');

      screen.getByLabelText(/비밀번호 확인/);
      screen.getByRole('button', { name: /가입하기/ });
    });
  });
});
