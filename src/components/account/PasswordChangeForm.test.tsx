import { fireEvent, screen, waitFor } from '@testing-library/react';

import { render } from '../../test-helper';

import PasswordChangeForm from './PasswordChangeForm';

const context = describe;

const store = {
  changePassword: jest.fn(),
};

jest.mock('../../hooks/usePasswordChangeFormStore', () => () => [{}, store]);

describe('<PasswordChangeForm />', () => {
  it('render change password form', () => {
    render(<PasswordChangeForm />);

    screen.getByLabelText(/새 비밀번호/);

    screen.getByRole('button', { name: /변경하기/ });
  });

  context('when submitting form', () => {
    it('execute changePassword function in store', async () => {
      render(<PasswordChangeForm />);

      fireEvent.submit(screen.getByTestId('password-change-form'));

      await waitFor(() => {
        expect(store.changePassword).toHaveBeenCalled();
      });
    });
  });
});
