import styled from 'styled-components';

import useChatRoomStore from '../../../hooks/useChatRoomStore';
import useFetchChatRoomNextPage from '../../../hooks/useFetchChatRoomNextPage';
import useMoveChatRoomScroll from '../../../hooks/useMoveChatRoomScroll';

import showDate from '../../../utils/message/showDate';

import ChatDate from './ChatDate';
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';

export default function Messages() {
  const [{
    chatRoomId, receiverId, receiverImageUrl, messages,
  }] = useChatRoomStore();

  const { ref, inView } = useFetchChatRoomNextPage(chatRoomId);

  const { scrollRef } = useMoveChatRoomScroll(inView);

  return (
    <Container ref={scrollRef}>
      <div ref={ref} />

      {messages.map((message, index) => (
        <div key={message.id}>
          {
            showDate({
              curDate: message.createdAt,
              prevDate: messages[index - 1]?.createdAt,
            })
              && <ChatDate curDate={message.createdAt} />
          }
          {
            receiverId === message.senderId ? (
              <ReceiverMessage
                message={message}
                prevMessage={messages[index - 1]}
                imageUrl={receiverImageUrl}
              />
            ) : (
              <SenderMessage
                message={message}
              />
            )
          }

        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;
