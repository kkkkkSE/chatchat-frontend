import { fireEvent, screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import OpenProfileListRow from './OpenProfileListRow';

const context = describe;

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

  context('when click open profile', () => {
    it('execute handleClickProfile function', () => {
      render(<OpenProfileListRow
        openProfile={openProfile}
        handleClickProfile={handleClickProfile}
      />);

      const element = screen.getByText(/기업명1/);

      fireEvent.click(element);

      expect(handleClickProfile).toHaveBeenCalledWith(openProfile.id);
    });
  });
});
