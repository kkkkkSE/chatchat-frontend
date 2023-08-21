import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { useInView } from 'react-intersection-observer';

import { QUERY_KEY } from '../constants/reactQuery';

import { apiService } from '../services/ApiService';

const useOpenProfileInfiniteQuery = () => {
  const [ref, inView] = useInView();

  const {
    isLoading, data, isPreviousData, fetchNextPage, error,
  } = useInfiniteQuery(
    QUERY_KEY.OPEN_PROFILE_LIST,
    ({ pageParam = 1 }) => apiService.fetchOpenProfiles({ page: pageParam }),
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

  return {
    ref,
    isLoading,
    data: data ?? { pages: [] },
    error,
  };
};

export default useOpenProfileInfiniteQuery;
