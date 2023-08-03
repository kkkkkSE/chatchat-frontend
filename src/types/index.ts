export interface Profile {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  profileVisibility?: boolean;
}

export interface ChatRoomSummary {
  id: number;
  receiverName: string;
  receiverImageUrl: string;
  lastMessage: string;
  unreadMessageCount: number;
  lastMessageDate: string;
}

export interface Page {
  current: number;
  total: number;
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
}

export interface ChatRoomDetail{
  id: number;
  receiverId: number;
  receiverName: string;
  receiverImageUrl: string;
  messages: Message[];
}

export interface AutoReply{
  id: number;
  question: string;
  answer: string;
}

export const nullProfile = {
  id: 0,
  name: '',
  imageUrl: '',
};
