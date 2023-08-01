import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../test-helper';

import ImageUploader from './ImageUploader';

import defaultImage from '../../assets/image/default-profile-image.png';

const context = describe;

const title = 'title';

const handleChangeImage = jest.fn();

const renderImageUploader = (imageUrl: string) => (
  render(<ImageUploader
    title={title}
    imageUrl={imageUrl}
    onChangeFileInput={handleChangeImage}
  />)
);

describe('<ImageUploader />', () => {
  it('render image uploader', () => {
    renderImageUploader(defaultImage);

    screen.getByText(title);
  });

  context('when imageUrl is default image', () => {
    it('show upload instructions', () => {
      renderImageUploader(defaultImage);

      screen.getByText('클릭하여 업로드');
    });
  });

  context('when imageUrl is not default image', () => {
    const newImage = 'newImage';

    it('show preview image', () => {
      renderImageUploader(newImage);

      screen.getByAltText('미리보기');
    });
  });

  context('when attaching an image', () => {
    const blob = new Blob([''], { type: 'image/png' });

    const file = new File([blob], 'testImage', { type: 'image/png' });

    it('execute handleChangeImage function', () => {
      renderImageUploader(defaultImage);

      const fileInput = screen.getByLabelText('프로필 사진 변경');

      fireEvent.change(fileInput, { target: { files: [file] } });

      expect(handleChangeImage).toHaveBeenCalled();
    });
  });
});
