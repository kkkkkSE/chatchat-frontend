import { useInView } from 'react-intersection-observer';

import { useNavigate } from 'react-router-dom';

import useFetchChatList from '../../hooks/useFetchChatList';
import useLoginUserStore from '../../hooks/useLoginUserStore';

import { ChatRoomSummary } from '../../types';

import ChatListRow from './ChatListRow';

export default function ChatList() {
  const navigate = useNavigate();

  const [ref, inView] = useInView();

  const [{ userType }] = useLoginUserStore();

  const { isLoading, data } = useFetchChatList(userType, inView);

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

  const handleClickChatRoom = (id: number) => {
    navigate(`/chatrooms/${id}`);
  };

  return (
    <div>
      <ul>
        {pages.map((page) => page.chatRooms.map((chatRoom: ChatRoomSummary) => (
          <ChatListRow
            key={chatRoom.id + chatRoom.receiverName}
            chatRoom={chatRoom}
            handleClickChatRoom={handleClickChatRoom}
          />
        )))}

      </ul>
      <div ref={ref} />
    </div>
  );
}
