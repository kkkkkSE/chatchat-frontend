import { useNavigate } from 'react-router-dom';

import { ChatRoomSummary } from '../../types';

import ChatListRow from './ChatListRow';

interface ChatListProps {
  chatRooms : ChatRoomSummary[]
}

export default function ChatList({ chatRooms } : ChatListProps) {
  const navigate = useNavigate();

  const handleChatRoomClick = (id: number) => {
    navigate(`/chatrooms/${id}`);
  };

  if (!chatRooms.length) {
    return <p>진행중인 대화가 없습니다.</p>;
  }

  return (
    <div>
      <ul>
        {chatRooms.map((chatRoom) => (
          <ChatListRow
            key={chatRoom.id + chatRoom.receiverName}
            chatRoomSummary={chatRoom}
            handleChatRoomClick={handleChatRoomClick}
          />
        ))}
      </ul>
    </div>
  );
}
