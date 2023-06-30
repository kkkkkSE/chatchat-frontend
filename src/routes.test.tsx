// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryRouter, RouterProvider } from 'react-router';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import routes from './routes';
import defaultTheme from './styles/defaultTheme';

const queryClient = new QueryClient();

const context = describe;

const setupRouterProvider = (path: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

const userType = 'company';
const setUserType = jest.fn();

jest.mock('usehooks-ts', () => ({
  useLocalStorage: () => (
    [userType, setUserType]
  ),
}));

describe('routes', () => {
  describe('before login', () => {
    context('when the current path is “/”', () => {
      it('renders <HomePage />', () => {
        setupRouterProvider('/');

        screen.getByText(/회원 유형을 선택해주세요/);
      });
    });

    context('when the current path is “/login”', () => {
      it('renders <LoginPage />', () => {
        setupRouterProvider('/login');

        screen.getByLabelText(/아이디/);
        screen.getByRole('button', { name: /로그인/ });
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

  describe('after login', () => {
    context('when the current path is “/chatrooms', () => {
      it('renders <ChatList />', () => {
        setupRouterProvider('/chatrooms');

        expect(screen.getAllByText(/채팅 목록/)).toHaveLength(2);
      });
    });
  });
});
