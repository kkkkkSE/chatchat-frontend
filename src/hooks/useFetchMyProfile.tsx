import { useQuery } from '@tanstack/react-query';

import { apiService } from '../services/ApiService';

const useFetchMyProfile = () => {
  const fetcher = () => apiService.fetchMyProfile();

  const { isLoading, data } = useQuery(['profile', 'me'], fetcher);

  return { isLoading, profile: data };
};

export default useFetchMyProfile;
