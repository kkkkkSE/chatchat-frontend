import { useParams } from 'react-router-dom';

import ContentLayout from '../components/layout/ContentLayout';
import ChatRoom from '../components/chat/ChatRoom';

import useFetchChatRoom from '../hooks/useFetchChatRoom';

export default function ChatRoomPage() {
  const { chatRoomId } = useParams();

  if (!chatRoomId) return <p>데이터를 불러올 수 없습니다.</p>;

  const fetchChatRoom = () => {
    // ...
  };

  const { isLoading, data: chatRoom } = useFetchChatRoom(chatRoomId, 1);

  const receiverName = chatRoom?.receiverName;

  return (
    <div>
      <ContentLayout enableBack page={receiverName}>
        <ChatRoom
          fetchChatRoom={fetchChatRoom}
          isLoading={isLoading}
          chatRoom={chatRoom}
        />
      </ContentLayout>
    </div>
  );
}
