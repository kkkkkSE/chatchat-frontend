import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import ContentLayout from '../components/layout/ContentLayout';
import ChatRoom from '../components/chat/ChatRoom';

import useChatRoomStore from '../hooks/useChatRoomStore';
import useLoginUserStore from '../hooks/useLoginUserStore';

export default function ChatRoomPage() {
  const [{ userType }] = useLoginUserStore();

  const params = useParams();
  const chatRoomId = Number(params.chatRoomId);

  // TODO : chatRoomId 없을 때 not found 페이지 이동
  if (!chatRoomId) {
    return <div><p>Not Found</p></div>;
  }

  const [{ receiverName, loading, page }, store] = useChatRoomStore();

  useEffect(() => {
    store.fetchChatRoom(userType, chatRoomId);

    return () => {
      store.reset();
    };
  }, []);

  return (
    <ContentLayout
      enableBack
      page={receiverName}
      testId={`chat-room-${chatRoomId}`}
    >
      {loading && page === 1 ? (
        <p>Loading...</p>
      ) : (
        <ChatRoom
          chatRoomId={chatRoomId}
        />
      )}
    </ContentLayout>
  );
}
