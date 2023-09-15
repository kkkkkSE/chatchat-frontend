import { fireEvent, screen, waitFor } from '@testing-library/react';

import { render } from '../../test-helper';

import WithdrawalForm from './WithdrawalForm';

const context = describe;

const store = {
  reset: jest.fn(),
  withdrawal: jest.fn(),
};

jest.mock('../../hooks/useWithdrawalFormStore', () => () => [{}, store]);

describe('<WithdrawalForm />', () => {
  it('render withdrawal form', () => {
    render(<WithdrawalForm />);

    screen.getByLabelText('비밀번호 입력');

    screen.getByRole('button', { name: '탈퇴하기' });
  });

  context('when submitting form', () => {
    it('execute changePassword function in store', async () => {
      render(<WithdrawalForm />);

      fireEvent.submit(screen.getByTestId('withdrawal-form'));

      await waitFor(() => {
        expect(store.withdrawal).toHaveBeenCalled();
      });
    });
  });
});
