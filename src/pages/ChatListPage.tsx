import ContentLayout from '../components/layout/ContentLayout';
import ChatList from '../components/chat/ChatList';

import useFetchChatList from '../hooks/useFetchChatList';

export default function ChatListPage() {
  // TODO : Infinity Scroll 구현
  const { isLoading, data } = useFetchChatList(undefined);

  const chatRooms = data?.chatRooms;

  // TODO : 로딩화면 Skeleton 구현
  return (
    <div>
      <ContentLayout page="채팅 목록">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ChatList chatRooms={chatRooms} />
        )}
      </ContentLayout>
    </div>
  );
}
