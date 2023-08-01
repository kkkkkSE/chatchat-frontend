import { fireEvent, screen, waitFor } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import { Profile } from '../../types';

import ProfileEditForm from './ProfileEditForm';

const context = describe;

const { company, customer } = fixtures;

const mockLoginUserData : {
  userType: string,
  profile: Profile,
  loading: boolean,
} = {
  userType: 'company',
  profile: company,
  loading: false,
};

jest.mock('../../hooks/useLoginUserStore', () => () => [mockLoginUserData]);

const store = {
  updateProfile: jest.fn(),
};

jest.mock('../../hooks/useProfileEditStore', () => () => [{}, store]);

describe('<ProfileEditForm />', () => {
  context('when user type is company', () => {
    it('render company profile edit form', () => {
      render(<ProfileEditForm />);

      screen.getByLabelText('기업명');
      screen.getByLabelText('소개글');

      screen.getAllByDisplayValue(company.name);
    });
  });

  context('when user type is customer', () => {
    beforeEach(() => {
      mockLoginUserData.profile = customer;
      mockLoginUserData.userType = 'customer';
    });

    it('render customer profile edit form', () => {
      render(<ProfileEditForm />);

      screen.getByLabelText('이름');

      const description = screen.queryByLabelText('소개글');

      expect(description).toBeNull();

      screen.getAllByDisplayValue(customer.name);
    });
  });

  context('when submitting form', () => {
    it('execute uploadLoginUser function in store', async () => {
      render(<ProfileEditForm />);

      fireEvent.submit(screen.getByTestId('profile-edit-form'));

      await waitFor(() => {
        expect(store.updateProfile).toHaveBeenCalled();
      });
    });
  });
});
