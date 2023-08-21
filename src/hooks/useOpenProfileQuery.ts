import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '../constants/reactQuery';

import { apiService } from '../services/ApiService';

import { nullProfile } from '../types';

const useOpenProfileQuery = (id: number) => {
  const fetcher = () => apiService.fetchOpenProfile({ id });

  const { isLoading, data, error } = useQuery(QUERY_KEY.OPEN_PROFILE(id), fetcher);

  return {
    isLoading,
    openProfile: data ?? nullProfile,
    error,
  };
};

export default useOpenProfileQuery;
