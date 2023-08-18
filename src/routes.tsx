import PostLoginLayout from './components/layout/PostLoginLayout';
import PreLoginLayout from './components/layout/PreLoginLayout';

import { STATIC_ROUTES } from './constants/routes';

import pages from './pages';

const routes = [
  {
    element: <PreLoginLayout />,
    children: [
      { path: STATIC_ROUTES.HOME, element: <pages.HomePage /> },
      { path: STATIC_ROUTES.LOGIN, element: <pages.LoginPage /> },
      { path: STATIC_ROUTES.SIGN_UP, element: <pages.SignUpPage /> },
    ],
  }, {
    element: <PostLoginLayout />,
    children: [
      { path: STATIC_ROUTES.CHATROOMS, element: <pages.ChatListPage /> },
      { path: `${STATIC_ROUTES.CHATROOMS}/:id`, element: <pages.ChatRoomPage /> },
      { path: STATIC_ROUTES.MY_PROFILE, element: <pages.ProfilePage /> },
      { path: STATIC_ROUTES.MY_PROFILE_EDIT, element: <pages.ProfileEditPage /> },
      { path: STATIC_ROUTES.AUTO_REPLIES, element: <pages.AutoReplyAdminPage /> },
      { path: STATIC_ROUTES.AUTO_REPLIES_NEW, element: <pages.AutoReplyNewPage /> },
      { path: `${STATIC_ROUTES.AUTO_REPLIES}/:id`, element: <pages.AutoReplyEditPage /> },
    ],
  },
];

export default routes;
