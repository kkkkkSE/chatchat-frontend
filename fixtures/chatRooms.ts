import profileImage from '../src/assets/image/default-profile-image.png';

const chatRooms = [
  {
    id: 1,
    receiverName: '이름1',
    receiverImageUrl: profileImage,
    lastMessage: '마지막 메세지 1',
    unreadMessageCount: 3,
    lastMessageDate: '2023.06.30 12:03:00',
  },
  {
    id: 2,
    receiverName: '이름2',
    receiverImageUrl: profileImage,
    lastMessage: '마지막 메세지 2',
    unreadMessageCount: 1001,
    lastMessageDate: '2023.01.30 18:00:00',
  },
  {
    id: 3,
    receiverName: '이름3',
    receiverImageUrl: profileImage,
    lastMessage: '메세지가 길어지면 두 줄로 표시돼야 하는데, 그걸 확인하려면 이렇게 메세지를 길게 보내봐야 하고 3줄이 넘어가면 안 돼서 말 줄임표가 표시돼야 합니다.',
    unreadMessageCount: 0,
    lastMessageDate: '2022.12.23 00:00:00',
  },
];

export default chatRooms;
