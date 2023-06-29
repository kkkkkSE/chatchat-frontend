import { useLocalStorage } from 'usehooks-ts';

export default function useAccessToken() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  return { accessToken, setAccessToken };
}
