import { useEffect, useState } from 'react';

import useAccessToken from './useAccessToken';
import useLoginUserStore from './useLoginUserStore';

const useCheckLoginUser = (type: string) => {
  const [validUser, setValidUser] = useState(false);

  const { accessToken, setAccessToken } = useAccessToken();

  const [{ error }, store] = useLoginUserStore();

  useEffect(() => {
    store.fetchLoginUser(type);
  }, [accessToken]);

  useEffect(() => {
    if (error) {
      store.reset();

      setAccessToken('');
    } else {
      setValidUser(true);
    }
  }, [error]);

  return { validUser };
};

export default useCheckLoginUser;
