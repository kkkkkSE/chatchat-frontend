import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useAccessToken from './useAccessToken';

export default function useCheckAccessToken(): boolean {
  const [ready, setReady] = useState(false);

  const { accessToken, setAccessToken } = useAccessToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setReady(true);
    }
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return ready;
}
