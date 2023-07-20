import { screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import ChatRoom from './ChatRoom';

jest.mock('react-intersection-observer', () => ({
  useInView: () => [],
}));

const { chatRoom } = fixtures;

jest.mock('../../hooks/useChatRoomStore', () => () => ([{
  chatRoomId: chatRoom.id,
  receiverId: chatRoom.receiverId,
  receiverImageUrl: chatRoom.receiverImageUrl,
  messages: chatRoom.messages,
}]));

const sendMessage = jest.fn();

jest.mock('../../hooks/useSockJS', () => () => ({ sendMessage }));

describe('<ChatRoom />', () => {
  it('render chat room', () => {
    render(<ChatRoom chatRoomId={chatRoom.id} />);

    screen.getByText(/메세지 20/);
    screen.getByPlaceholderText(/메세지 입력/);
  });
});
