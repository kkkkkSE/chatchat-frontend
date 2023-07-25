import PostLoginLayout from './components/layout/PostLoginLayout';
import PreLoginLayout from './components/layout/PreLoginLayout';

import { STATIC_ROUTES } from './constants/routes';

import ChatListPage from './pages/ChatListPage';
import ChatRoomPage from './pages/ChatRoomPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';

const routes = [
  {
    element: <PreLoginLayout />,
    children: [
      { path: STATIC_ROUTES.HOME, element: <HomePage /> },
      { path: STATIC_ROUTES.LOGIN, element: <LoginPage /> },
      { path: STATIC_ROUTES.SIGN_UP, element: <SignUpPage /> },
    ],
  }, {
    element: <PostLoginLayout />,
    children: [
      { path: STATIC_ROUTES.CHATROOMS, element: <ChatListPage /> },
      { path: `${STATIC_ROUTES.CHATROOMS}/:id`, element: <ChatRoomPage /> },
      { path: STATIC_ROUTES.MY_PROFILE, element: <ProfilePage /> },
    ],
  },
];

export default routes;
