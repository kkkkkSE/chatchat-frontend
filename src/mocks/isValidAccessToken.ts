import { VALID_ACCESS_TOKEN } from '../../fixtures/constants';

const isValidAccessToken = (
  type: 'company' | 'customer',
  accessToken:string,
) => {
  if (accessToken === VALID_ACCESS_TOKEN[type]) {
    return true;
  }

  return false;
};

export default isValidAccessToken;
