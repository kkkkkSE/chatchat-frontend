import { screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import AutoReplyItem from './AutoReplyItem';

const { autoReplies } = fixtures;

describe('<AutoReplyItem />', () => {
  const autoReply = autoReplies[0];

  it('render auto reply item', () => {
    render(<AutoReplyItem
      question={autoReply.question}
      answer={autoReply.answer}
    />);

    screen.getByText('질문1');
    screen.getByText('답변');
  });
});
