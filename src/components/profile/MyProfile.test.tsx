import { screen } from '@testing-library/react';
import fixtures from '../../../fixtures';
import { render } from '../../test-helper';
import { Profile } from '../../types';
import MyProfile from './MyProfile';

const context = describe;

const { company, customer } = fixtures;

const user = {
  type: 'company',
};

const mockFetchData : {
 isLoading: boolean,
 profile: Profile
} = {
  isLoading: false,
  profile: company,
};

jest.mock('../../hooks/useFetchMyProfile', () => () => mockFetchData);

jest.mock('usehooks-ts', () => ({
  useLocalStorage: () => [user.type],
}));

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
      user.type = 'customer';
      mockFetchData.profile = customer;
    });

    it('render a logged in customer profile ', () => {
      const { container } = render(<MyProfile />);

      expect(container).toHaveTextContent(/고객명/);
      expect(container).not.toHaveTextContent(/자동응답 관리/);
      expect(container).not.toContainElement(document.querySelector('pre'));
    });
  });
});
