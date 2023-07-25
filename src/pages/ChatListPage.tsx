import ContentLayout from '../components/layout/ContentLayout';
import ChatList from '../components/chat/ChatList';

export default function ChatListPage() {
  return (
    <ContentLayout
      pageHeader="채팅 목록"
      testId="chat-list"
    >
      <ChatList />
    </ContentLayout>
  );
}
