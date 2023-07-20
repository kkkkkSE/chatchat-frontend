import { screen } from '@testing-library/react';

import fixtures from '../../../../fixtures';

import { render } from '../../../test-helper';

import Messages from './Messages';

jest.mock('react-intersection-observer', () => ({
  useInView: () => [],
}));

const { chatRoom } = fixtures;

jest.mock('../../../hooks/useChatRoomStore', () => () => ([{
  chatRoomId: chatRoom.id,
  receiverId: chatRoom.receiverId,
  receiverImageUrl: chatRoom.receiverImageUrl,
  messages: chatRoom.messages,
}]));

describe('<Messages />', () => {
  it('render messages', () => {
    render(<Messages />);

    screen.getByText(/2023년 6월 30일/);
    screen.getByText(/메세지 20/);
  });
});
