import styled from 'styled-components';

import { ChatRoomSummary } from '../../types';

import ChatListRow from './ChatListRow';

interface ChatListProps {
  chatRooms : ChatRoomSummary[]
}

export default function ChatList({ chatRooms } : ChatListProps) {
  if (!chatRooms.length) {
    return (
      <Container>
        <p>진행중인 대화가 없습니다.</p>
      </Container>
    );
  }

  return (
    <Container>
      <ul>
        {chatRooms.map((chatRoom) => (
          <ChatListRow
            key={chatRoom.id + chatRoom.receiverName}
            chatRoomSummary={chatRoom}
          />
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.ul`
  padding-inline: 2rem;
  
  > p {
    ${(props) => props.theme.texts.regular.medium}
    padding-block: 6rem;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
    padding-inline: 1.6rem;

    > p {
      ${(props) => props.theme.texts.regular.small}
      padding-block: 5rem;
    }
  }
`;
