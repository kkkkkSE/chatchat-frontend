import { screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import { Profile } from '../../types';

import MyProfile from './MyProfile';

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

describe('<MyProfile />', () => {
  context('user type is company', () => {
    it('render a logged in company profile ', () => {
      render(<MyProfile />);

      screen.getByText(/기업명/);
      screen.getByText(/자동응답 관리/);
    });
  });

  context('user type is customer', () => {
    beforeEach(() => {
      mockLoginUserData.userType = 'customer';
      mockLoginUserData.profile = customer;
    });

    it('render a logged in customer profile ', () => {
      const { container } = render(<MyProfile />);

      expect(container).toHaveTextContent(/고객명/);
      expect(container).not.toHaveTextContent(/자동응답 관리/);
      expect(container).not.toContainElement(document.querySelector('pre'));
    });
  });
});
