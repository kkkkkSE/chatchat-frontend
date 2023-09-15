import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { EventSourcePolyfill } from 'event-source-polyfill';

import { QUERY_KEY } from '../constants/reactQuery';

import useAccessToken from './useAccessToken';
import useLoginUserStore from './useLoginUserStore';

const useSSE = () => {
  const queryClient = useQueryClient();

  const { accessToken } = useAccessToken();

  const [{ userType }] = useLoginUserStore();

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${process.env.API_BASE_URL}/connect?userType=${userType}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    eventSource.addEventListener('sse', (event: any) => {
      if (!event?.data) {
        return;
      }

      queryClient.invalidateQueries(QUERY_KEY.CHAT_LIST);
    });

    eventSource.addEventListener('error', (event: any) => {
      if (event.error?.message?.startsWith('No activity within')) {
        return;
      }

      eventSource.close();
    });

    return (() => {
      eventSource.close();
    });
  }, [accessToken]);
};

export default useSSE;
