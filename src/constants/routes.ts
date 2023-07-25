export const STATIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  CHATROOMS: '/chatrooms',
  MY_PROFILE: '/profile',
  EDIT_MY_PROFILE: '/profile/edit',
  AUTO_REPLIES: '/auto-replies',
  OPEN_PROFILES: '/open-profiles',
  ACCOUNT: '/account',
  DELETE_ACCOUNT: '/account/delete',
  CONFIRM_DELETE_ACCOUNT: '/account/delete/confirm',
  CHANGE_PASSWORD: '/account/change-password',
};

export const DYNAMIC_ROUTES = {
  CHATROOM: (id: number) => `/chatrooms/${id}`,
  OPEN_PROFILE: (id: number) => `/open-profiles/${id}`,
  EDIT_AUTO_REPLIY: (id: number) => `/auto-replies/${id}`,
};
