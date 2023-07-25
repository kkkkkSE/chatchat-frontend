import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import ContentLayout from '../components/layout/ContentLayout';
import ChatRoom from '../components/chat/ChatRoom';

import useChatRoomStore from '../hooks/useChatRoomStore';
import useLoginUserStore from '../hooks/useLoginUserStore';

export default function ChatRoomPage() {
  const [{ userType }] = useLoginUserStore();

  const params = useParams();
  const chatRoomId = Number(params.id);

  // TODO : chatRoomId 없을 때 not found 페이지 이동
  if (!chatRoomId) {
    return (
      <div>
        <p>Not Found</p>
      </div>
    );
  }

  useEffect(() => {
    store.fetchChatRoom(userType, chatRoomId);

    return () => {
      store.reset();
    };
  }, []);

  const [{
    receiverName, loading, page, error,
  }, store] = useChatRoomStore();

  // TODO : Error Page로 이동하기
  if (error) {
    return (
      <div>
        <p>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // TODO : 로딩화면 스켈레톤 적용
  return (
    <ContentLayout
      enableBack
      pageHeader={receiverName}
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
