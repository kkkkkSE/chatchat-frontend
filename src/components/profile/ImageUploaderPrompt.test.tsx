import { screen } from '@testing-library/react';

import { render } from '../../test-helper';

import ImageUploaderPrompt from './ImageUploaderPrompt';

describe('<ImageUploaderPrompt />', () => {
  it('render image uploader prompt', () => {
    render(<ImageUploaderPrompt />);

    screen.getByText('클릭하여 업로드');
  });
});
