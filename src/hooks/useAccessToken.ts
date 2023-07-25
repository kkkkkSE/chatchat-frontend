import { useLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_KEYS } from '../constants/localStorage';

export default function useAccessToken() {
  const [accessToken, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');

  return { accessToken, setAccessToken };
}
