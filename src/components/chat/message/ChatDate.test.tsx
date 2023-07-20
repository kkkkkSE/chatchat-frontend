import { screen } from '@testing-library/react';
import { render } from '../../../test-helper';

import ChatDate from './ChatDate';

describe('<ChatDate />', () => {
  it('render chat date', () => {
    render(<ChatDate curDate="2023.06.30 00:00:00" />);

    screen.getByText(/2023년 6월 30일/);
  });
});
