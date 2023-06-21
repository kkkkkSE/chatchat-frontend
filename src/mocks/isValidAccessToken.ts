const isValidAccessToken = (accessToken:string) => {
  if (accessToken === 'VAILDACCESSTOKEN') {
    return true;
  }

  return false;
};

export default isValidAccessToken;
