// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryRouter, RouterProvider } from 'react-router';

import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import routes from './routes';

import defaultTheme from './styles/defaultTheme';

import { VALID_ACCESS_TOKEN } from '../fixtures/constants';

import { DYNAMIC_ROUTES, STATIC_ROUTES } from './constants/routes';

import { nullProfile } from './types';

const context = describe;

const queryClient = new QueryClient();

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

const accessToken = VALID_ACCESS_TOKEN;

jest.mock('usehooks-ts', () => ({
  useLocalStorage: () => (
    [accessToken]
  ),
}));

const user = {
  type: 'company',
};

const store = {
  fetchLoginUser: jest.fn(),
};

jest.mock('./hooks/useLoginUserStore', () => () => [{
  userType: user.type,
  profile: nullProfile,
}, store]);

jest.mock('./hooks/useCheckLoginUser', () => () => ({ validUser: true }));

describe('routes', () => {
  describe('before login', () => {
    context('when the current path is "/"', () => {
      it('renders <HomePage />', () => {
        setupRouterProvider(STATIC_ROUTES.HOME);

        screen.getByText(/회원 유형을 선택해주세요/);
      });
    });

    describe('when the current path is "/login"', () => {
      context('without user type', () => {
        it('redirect to home page', () => {
          setupRouterProvider(STATIC_ROUTES.LOGIN);

          screen.getByText(/회원 유형을 선택해주세요/);
        });
      });

      context('with user type', () => {
        it('renders <LoginPage />', () => {
          setupRouterProvider(`${STATIC_ROUTES.LOGIN}?type=${user.type}`);

          screen.getByLabelText(/아이디/);
          screen.getByRole('button', { name: /로그인/ });
        });
      });
    });

    // TODO : 회원가입 구현 후 주석 해제

    // describe('when the current path is "/sign-up"', () => {
    //   context('without user type', () => {
    //     it('redirect to home page', () => {
    //       setupRouterProvider(STATIC_ROUTES.SIGN_UP);

    //       screen.getByText(/회원 유형을 선택해주세요/);
    //     });
    //   });

    //   context('with user type', () => {
    //     it('renders <SignUpPage />', () => {
    //       setupRouterProvider(`${STATIC_ROUTES.SIGN_UP)}?type=${user.type}`);

    //       screen.getByLabelText(/비밀번호 확인/);
    //       screen.getByRole('button', { name: /가입하기/ });
    //     });
    //   });
    // });
  });

  describe('after login', () => {
    context('when the current path is "/chatrooms"', () => {
      it('renders <ChatListPage />', () => {
        setupRouterProvider(STATIC_ROUTES.CHATROOMS);

        screen.getByTestId(/chat-list/);
      });
    });

    context('when the current path is "/chatrooms/:id"', () => {
      it('renders <ChatRoomPage />', () => {
        const chatRoomId = 1;

        setupRouterProvider(DYNAMIC_ROUTES.CHATROOM(chatRoomId));

        screen.getByTestId(`chat-room-${chatRoomId}`);
      });
    });

    context('when the current path is "/profile"', () => {
      it('renders <ProfilePage />', () => {
        setupRouterProvider(STATIC_ROUTES.MY_PROFILE);

        screen.getByTestId(/my-profile/);
      });
    });

    context('when the current path is "/auto-replies"', () => {
      it('renders <AutoReplyAdminList />', () => {
        setupRouterProvider(STATIC_ROUTES.AUTO_REPLIES);

        screen.getByTestId(/auto-reply-list/);
      });
    });
  });
});
