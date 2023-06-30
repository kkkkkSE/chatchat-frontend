import { useQuery } from '@tanstack/react-query';

import { apiService } from '../services/ApiService';

const useFetchChatList = (page?: number) => {
  const fetcher = () => apiService.fetchChatList({ page });

  const { isLoading, data } = useQuery(['chatList'], fetcher);

  return { isLoading, data };
};

export default useFetchChatList;
