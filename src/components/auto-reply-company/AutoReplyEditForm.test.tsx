import { fireEvent, screen, waitFor } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import AutoReplyEditForm from './AutoReplyEditForm';

const context = describe;

const store = {
  modifyAutoReply: jest.fn(),
};

jest.mock('../../hooks/useAutoReplyFormStore', () => () => [{}, store]);

describe('<AutoReplyEditForm />', () => {
  const autoReply = fixtures.autoReplies[0];

  it('renders auto reply edit form', () => {
    render(<AutoReplyEditForm
      id={autoReply.id}
      question={autoReply.question}
      answer={autoReply.answer}
    />);

    screen.getAllByDisplayValue(autoReply.question);
    screen.getAllByDisplayValue(autoReply.answer);

    screen.getByText(`${autoReply.question.length} / 60`);
    screen.getByText(`${autoReply.answer.length} / 150`);

    screen.getByRole('button', { name: '저장하기' });
  });

  context('when submitting form', () => {
    it('execute uploadLoginUser function in store', async () => {
      render(<AutoReplyEditForm
        id={1}
        question="question"
        answer="answer"
      />);

      fireEvent.submit(screen.getByTestId('auto-reply-edit-form'));

      await waitFor(() => {
        expect(store.modifyAutoReply).toHaveBeenCalled();
      });
    });
  });
});
