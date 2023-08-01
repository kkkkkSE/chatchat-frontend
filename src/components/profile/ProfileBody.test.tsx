import { screen } from '@testing-library/react';

import fixtures from '../../../fixtures';

import { render } from '../../test-helper';

import ProfileBody from './ProfileBody';

const profile = fixtures.company;

describe('<ProfileBody />', () => {
  it('render user profile', () => {
    render(<ProfileBody profile={profile} />);

    screen.getByText('기업명1');
    screen.getByAltText(profile.name);
  });
});
