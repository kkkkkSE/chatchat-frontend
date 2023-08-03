import { screen } from '@testing-library/react';
import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import AutoReplyRow from './AutoReplyRow';

const { autoReplies } = fixtures;

describe('<AutoReplyRow />', () => {
  const autoReply = autoReplies[0];

  it('render auto reply row', () => {
    render(<AutoReplyRow autoReply={autoReply} />);

    screen.getByText('질문');
    screen.getByAltText('삭제');
  });
});
