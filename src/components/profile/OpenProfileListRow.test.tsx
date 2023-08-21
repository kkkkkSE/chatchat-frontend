import { screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import OpenProfileListRow from './OpenProfileListRow';

const handleClickProfile = jest.fn();

describe('<OpenProfileListRow />', () => {
  const openProfile = fixtures.companies[0];

  it('render open profile', () => {
    render(<OpenProfileListRow
      openProfile={openProfile}
      handleClickProfile={handleClickProfile}
    />);

    screen.getByText(/기업명1/);
  });
});
