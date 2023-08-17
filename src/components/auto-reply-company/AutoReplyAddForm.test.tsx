import { fireEvent, screen, waitFor } from '@testing-library/react';

import { render } from '../../test-helper';

import AutoReplyAddForm from './AutoReplyAddForm';

const context = describe;

const store = {
  addAutoReply: jest.fn(),
};

jest.mock('../../hooks/useAutoReplyFormStore', () => () => [{}, store]);

describe('<AutoReplyAddForm />', () => {
  it('renders auto reply add form', () => {
    render(<AutoReplyAddForm />);

    screen.getByLabelText('질문');
    screen.getByLabelText('답변');

    screen.getByRole('button', { name: '저장하기' });
  });

  context('when submitting form', () => {
    it('execute addAutoReply function in store', async () => {
      render(<AutoReplyAddForm />);

      fireEvent.submit(screen.getByTestId('auto-reply-add-form'));

      await waitFor(() => {
        expect(store.addAutoReply).toHaveBeenCalled();
      });
    });
  });
});
