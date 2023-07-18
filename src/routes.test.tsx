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

const accessToken = 'VALIDACCESSTOKEN';

jest.mock('usehooks-ts', () => ({
  useLocalStorage: () => (
    [accessToken]
  ),
}));

const userType = 'company';

jest.mock('./hooks/useLoginUserStore', () => () => [userType]);

jest.mock('./hooks/useCheckLoginUser', () => () => ({ validUser: true }));

describe('routes', () => {
  describe('before login', () => {
    context('when the current path is "/"', () => {
      it('renders <HomePage />', () => {
        setupRouterProvider('/');

        screen.getByText(/회원 유형을 선택해주세요/);
      });
    });

    describe('when the current path is "/login"', () => {
      context('without user type', () => {
        it('redirect to home page', () => {
          setupRouterProvider('/login');

          screen.getByText(/회원 유형을 선택해주세요/);
        });
      });

      context('with user type', () => {
        it('renders <LoginPage />', () => {
          setupRouterProvider(`/login?type=${userType}`);

          screen.getByLabelText(/아이디/);
          screen.getByRole('button', { name: /로그인/ });
        });
      });
    });

    // TODO : 회원가입 구현 후 주석 해제

    // describe('when the current path is "/sign-up"', () => {
    //   context('without user type', () => {
    //     it('redirect to home page', () => {
    //       setupRouterProvider('/sign-up');

    //       screen.getByText(/회원 유형을 선택해주세요/);
    //     });
    //   });

    //   context('with user type', () => {
    //     it('renders <SignUpPage />', () => {
    //       setupRouterProvider(`/sign-up?type=${userType}`);

    //       screen.getByLabelText(/비밀번호 확인/);
    //       screen.getByRole('button', { name: /가입하기/ });
    //     });
    //   });
    // });
  });

  describe('after login', () => {
    context('when the current path is "/chatrooms', () => {
      it('renders <ChatListPage />', () => {
        setupRouterProvider('/chatrooms');

        screen.getByTestId(/chat-list/);
      });
    });

    context('when the current path is "/profile', () => {
      it('renders <ProfilePage />', () => {
        setupRouterProvider('/profile');

        screen.getByTestId(/my-profile/);
      });
    });
  });
});
