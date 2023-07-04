import { useQuery } from '@tanstack/react-query';

import { apiService } from '../services/ApiService';

const useFetchChatRoom = (id: string, page: number) => {
  const fetcher = () => apiService.fetchChatRoom({ id, page });

  const { isLoading, data } = useQuery(['chatRoom'], fetcher);

  return { isLoading, data };
};

export default useFetchChatRoom;
