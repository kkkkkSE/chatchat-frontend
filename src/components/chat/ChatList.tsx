import { useInView } from 'react-intersection-observer';

import useFetchChatList from '../../hooks/useFetchChatList';

import { ChatRoomSummary } from '../../types';

import ChatListRow from './ChatListRow';

export default function ChatList() {
  const [ref, inView] = useInView();

  const { isLoading, data } = useFetchChatList(inView);

  if (!data) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { pages } = data;

  if (!pages[0].chatRooms.length) {
    return <p>진행중인 대화가 없습니다.</p>;
  }

  return (
    <div>
      <ul>
        {pages.map((page) => page.chatRooms.map((chatRoom: ChatRoomSummary) => (
          <ChatListRow
            key={chatRoom.id + chatRoom.receiverName}
            chatRoom={chatRoom}
          />
        )))}

      </ul>
      <div ref={ref} />
    </div>
  );
}
