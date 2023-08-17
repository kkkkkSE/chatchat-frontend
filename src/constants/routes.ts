export const STATIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  CHATROOMS: '/chatrooms',
  MY_PROFILE: '/profile',
  MY_PROFILE_EDIT: '/profile/edit',
  AUTO_REPLIES: '/auto-replies',
  AUTO_REPLIES_NEW: '/auto-replies/new',
  OPEN_PROFILES: '/open-profiles',
  ACCOUNT: '/account',
  DELETE_ACCOUNT: '/account/delete',
  CONFIRM_DELETE_ACCOUNT: '/account/delete/confirm',
  CHANGE_PASSWORD: '/account/change-password',
};

export const DYNAMIC_ROUTES = {
  CHATROOM: (id: number) => `/chatrooms/${id}`,
  OPEN_PROFILE: (id: number) => `/open-profiles/${id}`,
  AUTO_REPLIY_EDIT: (id: number) => `/auto-replies/${id}`,
};
