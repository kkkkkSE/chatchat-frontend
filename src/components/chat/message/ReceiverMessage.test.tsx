import { screen } from '@testing-library/react';

import fixtures from '../../../../fixtures';

import { render } from '../../../test-helper';

import ReceiverMessage from './ReceiverMessage';

const { chatRoom } = fixtures;

describe('<ReceiverMessage />', () => {
  it('render message from receiver', () => {
    render(<ReceiverMessage
      message={chatRoom.messages[1]}
      prevMessage={chatRoom.messages[0]}
      imageUrl={chatRoom.receiverImageUrl}
    />);

    screen.getByAltText(/프로필 정보/);
    screen.getByText(chatRoom.messages[1].content);
    screen.getByText(/오전 3:00/);
  });
});
