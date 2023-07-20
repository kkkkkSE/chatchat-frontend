import { screen } from '@testing-library/react';

import fixtures from '../../../../fixtures';

import { render } from '../../../test-helper';

import SenderMessage from './SenderMessage';

const { chatRoom } = fixtures;

describe('<SenderMessage />', () => {
  it('render message from receiver', () => {
    const container = render(<SenderMessage
      message={chatRoom.messages[1]}
    />);

    screen.getByText(chatRoom.messages[1].content);
    screen.getByText(/오전 3:00/);
    expect(container).not.toHaveProperty('alt');
  });
});
