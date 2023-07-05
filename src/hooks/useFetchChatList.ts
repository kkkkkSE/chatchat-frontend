import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { apiService } from '../services/ApiService';

const useFetchChatList = (trigger: boolean) => {
  const {
    isLoading, data, isPreviousData, fetchNextPage,
  } = useInfiniteQuery(
    ['chatList'],
    ({ pageParam = 1 }) => apiService.fetchChatList({ page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const cur = lastPage.page.current;
        if (lastPage.page.total > cur) {
          return cur + 1;
        }
        return undefined;
      },
    },
  );

  useEffect(() => {
    if (!isPreviousData && trigger) {
      fetchNextPage();
    }
  }, [trigger]);

  return { isLoading, data };
};

export default useFetchChatList;
