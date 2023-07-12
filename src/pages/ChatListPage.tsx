import ContentLayout from '../components/layout/ContentLayout';
import ChatList from '../components/chat/ChatList';

export default function ChatListPage() {
  return (
    <ContentLayout
      page="채팅 목록"
      testId="chat-list"
    >
      <ChatList />
    </ContentLayout>
  );
}
