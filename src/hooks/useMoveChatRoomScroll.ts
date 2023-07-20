import { useEffect, useRef } from 'react';

import useChatRoomStore from './useChatRoomStore';

const useMoveChatRoomScroll = (inView: boolean) => {
  const [{ messages }] = useChatRoomStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      const currentScrollHeight = scrollRef.current.scrollHeight;
      const targetScrollHeight = currentScrollHeight - prevScrollHeightRef.current;

      if (inView) {
        scrollRef.current.scrollTop = targetScrollHeight;

        prevScrollHeightRef.current = currentScrollHeight;
      } else {
        scrollRef.current.scrollTop = currentScrollHeight;
      }

      prevScrollHeightRef.current = currentScrollHeight;
    }
  }, [messages]);

  return { scrollRef };
};

export default useMoveChatRoomScroll;
