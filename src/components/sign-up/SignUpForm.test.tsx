import { fireEvent, screen, waitFor } from '@testing-library/react';

import { render } from '../../test-helper';

import SignUpForm from './SignUpForm';

const context = describe;

const userType = 'company';

const store = {
  signUp: jest.fn(),
};

jest.mock('../../hooks/useSignUpFormStore', () => () => [{}, store]);

describe('<SignUpForm />', () => {
  it('render sign up form', () => {
    render(<SignUpForm
      userType={userType}
    />);

    screen.getByLabelText(/비밀번호 확인/);

    screen.getByRole('button', { name: /가입하기/ });
  });

  context('user type is company', () => {
    it('name label is "기업명"', () => {
      render(<SignUpForm
        userType="company"
      />);

      screen.getByLabelText(/기업명/);
    });
  });

  context('user type is customer', () => {
    it('name label is "이름"', () => {
      render(<SignUpForm
        userType="customer"
      />);

      screen.getByLabelText(/이름/);
    });
  });

  context('when submitting form', () => {
    it('execute signUp function in store', async () => {
      render(<SignUpForm
        userType={userType}
      />);

      fireEvent.submit(screen.getByTestId('sign-up-form'));

      await waitFor(() => {
        expect(store.signUp).toHaveBeenCalled();
      });
    });
  });
});
