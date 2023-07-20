import styled from 'styled-components';

import Messages from './message/Messages';
import MessageInput from './message/MessageInput';

interface ChatRoomProps {
  chatRoomId: number;
}

export default function ChatRoom({
  chatRoomId,
} : ChatRoomProps) {
  return (
    <Container>
      <Messages />
      <MessageInput
        chatRoomId={chatRoomId}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
`;
