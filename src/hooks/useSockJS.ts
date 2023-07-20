/* eslint-disable import/no-unresolved */
import { useEffect, useRef } from 'react';

import SockJS from 'sockjs-client';

import { CompatClient, Stomp } from '@stomp/stompjs';

import useChatRoomStore from './useChatRoomStore';
import useLoginUserStore from './useLoginUserStore';

const useSockJS = (chatRoomId: number) => {
  const [{ userType, profile }] = useLoginUserStore();

  const [, store] = useChatRoomStore();

  const sock = new SockJS(`${process.env.API_BASE_URL}/messages`);

  const client = useRef<CompatClient>(Stomp.over(sock));

  useEffect(() => {
    client.current.connect({}, () => {
      client.current?.subscribe(
        `/sub/chatrooms/${chatRoomId}`,
        (response) => {
          const newMessage = JSON.parse(response.body);
          store.addMessage(newMessage);
        },
        {},
      );
    });

    return (() => {
      client.current?.disconnect();
    });
  }, []);

  const sendMessage = (content: string) => {
    const validContent = content && (content.trim() !== '');

    if (!validContent) return;

    client.current.send(
      '/pub/messages',
      {},
      JSON.stringify({
        chatRoomId,
        senderId: profile.id,
        content,
        role: userType,
      }),
    );
  };

  return {
    sendMessage,
  };
};

export default useSockJS;
