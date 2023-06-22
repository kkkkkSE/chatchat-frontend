const isValidAccessToken = (accessToken:string) => {
  if (accessToken === 'VALIDACCESSTOKEN') {
    return true;
  }

  return false;
};

export default isValidAccessToken;
