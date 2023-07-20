import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import useChatRoomStore from './useChatRoomStore';
import useLoginUserStore from './useLoginUserStore';

const useFetchChatRoomNextPage = (id: number) => {
  const [{ userType }] = useLoginUserStore();

  const [{ loading, page, totalPage }, store] = useChatRoomStore();

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && (page < totalPage) && !loading) {
      store.increasePage();
      store.fetchChatRoom(userType, id);
    }
  }, [inView]);

  return { ref, inView };
};

export default useFetchChatRoomNextPage;
