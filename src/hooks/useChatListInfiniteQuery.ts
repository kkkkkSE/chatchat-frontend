import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { useInView } from 'react-intersection-observer';

import { apiService } from '../services/ApiService';

import { QUERY_KEY } from '../constants/reactQuery';

const useChatListInfiniteQuery = (type: string) => {
  const [ref, inView] = useInView();

  const {
    isLoading, data, isPreviousData, fetchNextPage,
  } = useInfiniteQuery(
    QUERY_KEY.CHAT_LIST,
    ({ pageParam = 1 }) => apiService.fetchChatList({ type, page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const cur = lastPage.page.current;
        if (lastPage.page.total > cur) {
          return cur + 1;
        }
        return undefined;
      },
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (!isPreviousData && inView) {
      fetchNextPage();
    }
  }, [inView]);

  return { ref, isLoading, data };
};

export default useChatListInfiniteQuery;
