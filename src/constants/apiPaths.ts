const PLURAL_USER_TYPES : Record<string, string> = {
  company: 'companies',
  customer: 'customers',
};

export const STATIC_API_PATHS = {
  OPEN_PROFILES: '/companies',
  AUTO_REPLIES_BY_CUSTOMER: '/auto-replies',
  AUTO_REPLIES_BY_COMPANY: '/company/auto-replies',
  REISSUE_TOKEN: '/token',
  LOGOUT: '/logout',
  UPLOAD_PROFILE_IMAGE: '/files?folder=profile',
};

export const DYNAMIC_API_PATHS = {
  LOGIN: (type: string) => `/${type}/session`,
  CHANGE_PASSWORD: (type: string) => `/${PLURAL_USER_TYPES[type]}/me/password`,
  SIGN_UP: (type: string) => `/${PLURAL_USER_TYPES[type]}`,
  SELF_ACCOUNT: (type: string) => `/${PLURAL_USER_TYPES[type]}/me`,
  CHATROOMS: (type: string) => `/${type}/chatrooms`,
  CHATROOM: (type: string, id: number) => `/${type}/chatrooms/${id}`,
  OPEN_PROFILE: (id: number) => `/companies/${id}`,
  AUTO_REPLIES_FOR_CUSTOMER: (id: number) => `/auto-replies/${id}`,
  AUTO_REPLIES_FOR_COMPANY: (id: number) => `/company/auto-replies/${id}`,
};
