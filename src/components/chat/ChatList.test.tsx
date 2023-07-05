import { screen } from '@testing-library/react';
import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import ChatList from './ChatList';

const context = describe;

const mockFetchData = {
  isLoading: false,
  data: {
    pages: [{
      chatRooms: fixtures.chatRooms,
      page: fixtures.page,
    }],
  },
};

jest.mock('../../hooks/useFetchChatList', () => () => mockFetchData);

jest.mock('react-intersection-observer', () => ({
  useInView: () => [],
}));

describe('<CahtList />', () => {
  it('render chat list', () => {
    render(<ChatList />);

    screen.getByText(/이름1/);
    screen.getByText(/\+999/);
  });

  context('empty chat list', () => {
    beforeEach(() => {
      mockFetchData.data.pages[0].chatRooms = [];
    });

    it('render empty message', () => {
      render(<ChatList />);

      screen.getByText(/진행중인 대화가 없습니다/);
    });
  });

  context('when loading', () => {
    beforeEach(() => {
      mockFetchData.isLoading = true;
    });

    it('render loading message', () => {
      render(<ChatList />);

      screen.getByText(/Loading/);
    });
  });
});
