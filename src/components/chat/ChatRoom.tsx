import styled from 'styled-components';

import { ChatRoomDetail } from '../../types';

import Messages from '../message/Messages';
import MessageInput from '../message/MessageInput';

interface ChatRoomProps {
  chatRoom: ChatRoomDetail;
  isLoading: boolean;
  fetchChatRoom: (page: number) => void;
}

export default function ChatRoom({
  chatRoom, isLoading, fetchChatRoom,
} : ChatRoomProps) {
  if (isLoading) {
    return <p>채팅 내역을 불러오고 있습니다...</p>;
  }

  return (
    <Container>
      <Messages
        chatRoom={chatRoom}
        fetchChatRoom={fetchChatRoom}
      />
      <MessageInput
        chatRoomId={chatRoom.id}
        receiverId={chatRoom.receiverId}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;
