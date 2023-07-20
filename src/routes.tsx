import PostLoginLayout from './components/layout/PostLoginLayout';
import PreLoginLayout from './components/layout/PreLoginLayout';
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
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
    ],
  }, {
    element: <PostLoginLayout />,
    children: [
      { path: '/chatrooms', element: <ChatListPage /> },
      { path: '/chatrooms/:chatRoomId', element: <ChatRoomPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
];

export default routes;
