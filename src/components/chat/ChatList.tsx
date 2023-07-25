import { useNavigate } from 'react-router-dom';

import { DYNAMIC_ROUTES } from '../../constants/routes';

import useChatListInfiniteQuery from '../../hooks/useChatListInfiniteQuery';
import useLoginUserStore from '../../hooks/useLoginUserStore';

import { ChatRoomSummary } from '../../types';

import ChatListRow from './ChatListRow';

export default function ChatList() {
  const navigate = useNavigate();

  const [{ userType }] = useLoginUserStore();

  const {
    ref, isLoading, data, error,
  } = useChatListInfiniteQuery(userType);

  // TODO : Error Page로 이동하기
  if (error) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  // TODO : 로딩화면 스켈레톤 적용
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { pages } = data;

  if (pages[0].chatRooms.length === 0) {
    return <p>진행중인 대화가 없습니다.</p>;
  }

  const handleClickChatRoom = (id: number) => {
    navigate(DYNAMIC_ROUTES.CHATROOM(id));
  };

  return (
    <div>
      <ul>
        {pages.map((page) => page.chatRooms.map((chatRoom: ChatRoomSummary) => (
          <ChatListRow
            key={chatRoom.id}
            chatRoom={chatRoom}
            handleClickChatRoom={handleClickChatRoom}
          />
        )))}

      </ul>
      <div ref={ref} />
    </div>
  );
}
