import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '../constants/reactQuery';

import { apiService } from '../services/ApiService';

const useAutoReplyAdminQuery = () => {
  const fetcher = () => apiService.fetchAutoReplyByCompany();

  const { isLoading, data, error } = useQuery(QUERY_KEY.AUTO_REPLY_ADMIN_LIST, fetcher);

  return {
    isLoading,
    autoReplies: data?.autoReplies ?? [],
    error,
  };
};

export default useAutoReplyAdminQuery;
