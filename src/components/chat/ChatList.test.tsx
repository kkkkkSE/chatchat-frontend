import { screen } from '@testing-library/react';

import { render } from '../../test-helper';

import fixtures from '../../../fixtures';

import ChatList from './ChatList';

const context = describe;

describe('<CahtList />', () => {
  const { chatRooms } = fixtures;

  it('render chat list', () => {
    render(<ChatList chatRooms={chatRooms} />);

    screen.getByText(/이름1/);
    screen.getByText(/\+999/);
  });

  context('empty chat list', () => {
    render(<ChatList chatRooms={[]} />);

    screen.getByText(/진행중인 대화가 없습니다/);
  });
});
