import { screen } from '@testing-library/react';

import { render } from '../../test-helper';

import ChatListRow from './ChatListRow';

const context = describe;

describe('<ChatListRow />', () => {
  const chatRoomSummary = {
    id: 1,
    receiverName: '이름1',
    receiverImageUrl: 'https://example.com/4',
    lastMessage: '마지막 메세지 1',
    unreadMessageCount: 3,
    lastMessageDate: '1111.11.11 11:11:11',
  };

  it('render chat room summary', () => {
    render(<ChatListRow chatRoomSummary={chatRoomSummary} />);

    screen.getByText(/메세지 1/);
  });

  describe('about unread message count', () => {
    context('0 unread message', () => {
      beforeEach(() => {
        chatRoomSummary.unreadMessageCount = 0;
      });

      it('not rendered unread message count', () => {
        const { container } = render(<ChatListRow chatRoomSummary={chatRoomSummary} />);

        expect(container).not.toHaveTextContent('0');
      });
    });

    context('1~999 unread message', () => {
      beforeEach(() => {
        chatRoomSummary.unreadMessageCount = 3;
      });

      it('render unread message count', () => {
        const { container } = render(<ChatListRow chatRoomSummary={chatRoomSummary} />);

        expect(container).toHaveTextContent('3');
      });
    });

    context('more than 1000 unread message', () => {
      beforeEach(() => {
        chatRoomSummary.unreadMessageCount = 1000;
      });

      it('render +999', () => {
        const { container } = render(<ChatListRow chatRoomSummary={chatRoomSummary} />);

        expect(container).toHaveTextContent('+999');
      });
    });
  });
});
