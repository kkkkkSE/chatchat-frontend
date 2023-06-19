import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../test-helper';

import LoginForm from './LoginForm';

const context = describe;

const onClickMoveSignUp = jest.fn();

const state = {
  username: '',
  password: '',
  errorMessage: '',
};

const store = {
  login: jest.fn(),
};

jest.mock('../../hooks/useLoginFormStore', () => () => [state, store]);

describe('<LoginForm />', () => {
  it('render login form', () => {
    render(<LoginForm
      onClickMoveSignUp={onClickMoveSignUp}
    />);

    screen.getByLabelText(/아이디/);
    screen.getByLabelText(/비밀번호/);

    screen.getByRole('button', { name: /로그인/ });
    screen.getByRole('button', { name: /회원가입/ });
  });

  context('click "로그인" button', () => {
    it('validation and login', async () => {
      render(<LoginForm
        onClickMoveSignUp={onClickMoveSignUp}
      />);

      fireEvent.click(screen.getByRole('button', { name: /로그인/ }));

      expect(store.login).toHaveBeenCalled();
    });
  });

  context('click "회원가입" button', () => {
    it('execute onClickMoveSignUp function', async () => {
      render(<LoginForm
        onClickMoveSignUp={onClickMoveSignUp}
      />);

      fireEvent.click(screen.getByRole('button', { name: /회원가입/ }));

      expect(onClickMoveSignUp).toHaveBeenCalled();
    });
  });
});
