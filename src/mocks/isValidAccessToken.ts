import { VALID_ACCESS_TOKEN } from '../../fixtures/constants';

const isValidAccessToken = (accessToken:string) => {
  if (accessToken === VALID_ACCESS_TOKEN) {
    return true;
  }

  return false;
};

export default isValidAccessToken;
