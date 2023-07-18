import { useEffect, useState } from 'react';

import useAccessToken from './useAccessToken';
import useLoginUserStore from './useLoginUserStore';

const useCheckLoginUser = (type: string) => {
  const [validUser, setValidUser] = useState(false);

  const { accessToken, setAccessToken } = useAccessToken();

  const [{ error }, store] = useLoginUserStore();

  useEffect(() => {
    const fetchLoginUser = async () => {
      await store.fetchLoginUser(type);
    };

    fetchLoginUser();

    if (error) {
      setAccessToken('');
    } else {
      setValidUser(true);
    }
  }, [accessToken]);

  return { validUser };
};

export default useCheckLoginUser;
