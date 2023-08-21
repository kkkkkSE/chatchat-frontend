import { screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import OpenProfileList from './OpenProfileList';

const context = describe;

const mockQueryData = {
  isLoading: false,
  data: {
    pages: [{
      companySummaries: fixtures.companies,
      page: fixtures.page,
    }],
  },
};

jest.mock('../../hooks/useOpenProfileInfiniteQuery', () => () => mockQueryData);

jest.mock('react-intersection-observer', () => ({
  useInView: () => [],
}));

describe('<OpenProfileList />', () => {
  it('render open profile list', () => {
    render(<OpenProfileList />);

    screen.getByText(/기업명1/);
    screen.getByText(/기업 설명2/);
  });

  context('empty chat list', () => {
    beforeEach(() => {
      mockQueryData.data.pages[0].companySummaries = [];
    });

    it('render empty message', () => {
      render(<OpenProfileList />);

      screen.getByText(/등록된 오픈 프로필이 없습니다./);
    });
  });

  context('when loading', () => {
    beforeEach(() => {
      mockQueryData.isLoading = true;
    });

    it('render loading message', () => {
      render(<OpenProfileList />);

      screen.getByText(/Loading/);
    });
  });
});
