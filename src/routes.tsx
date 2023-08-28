import PostLoginLayout from './components/layout/PostLoginLayout';
import PreLoginLayout from './components/layout/PreLoginLayout';

import { STATIC_ROUTES } from './constants/routes';

import * as Pages from './pages';

const routes = [
  {
    element: <PreLoginLayout />,
    children: [
      { path: STATIC_ROUTES.HOME, element: <Pages.HomePage /> },
      { path: STATIC_ROUTES.LOGIN, element: <Pages.LoginPage /> },
      { path: STATIC_ROUTES.SIGN_UP, element: <Pages.SignUpPage /> },
    ],
  }, {
    element: <PostLoginLayout />,
    children: [
      { path: STATIC_ROUTES.CHATROOMS, element: <Pages.ChatListPage /> },
      { path: `${STATIC_ROUTES.CHATROOMS}/:id`, element: <Pages.ChatRoomPage /> },
      { path: STATIC_ROUTES.MY_PROFILE, element: <Pages.MyProfilePage /> },
      { path: STATIC_ROUTES.MY_PROFILE_EDIT, element: <Pages.ProfileEditPage /> },
      { path: STATIC_ROUTES.AUTO_REPLIES, element: <Pages.AutoReplyAdminPage /> },
      { path: STATIC_ROUTES.AUTO_REPLIES_NEW, element: <Pages.AutoReplyNewPage /> },
      { path: `${STATIC_ROUTES.AUTO_REPLIES}/:id`, element: <Pages.AutoReplyEditPage /> },
      { path: STATIC_ROUTES.OPEN_PROFILES, element: <Pages.OpenProfileListPage /> },
      { path: `${STATIC_ROUTES.OPEN_PROFILES}/:id`, element: <Pages.OpenProfilePage /> },
    ],
  },
];

export default routes;
