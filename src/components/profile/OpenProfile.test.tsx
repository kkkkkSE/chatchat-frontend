import { fireEvent, screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import OpenProfile from './OpenProfile';

const context = describe;

const handleClickInquery = jest.fn();

describe('<OpenProfile />', () => {
  const openProfile = fixtures.companies[0];

  it('renders open profile', () => {
    render(<OpenProfile
      openProfile={openProfile}
      onClickInquiry={handleClickInquery}
    />);

    screen.getByText(/기업 설명1/);
  });

  context('when click inquery button', () => {
    it('execute handleClickInquiry function', () => {
      render(<OpenProfile
        openProfile={openProfile}
        onClickInquiry={handleClickInquery}
      />);

      const button = screen.getByText(/문의하기/);

      fireEvent.click(button);

      expect(handleClickInquery).toHaveBeenCalled();
    });
  });
});
