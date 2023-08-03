import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../test-helper';

import AutoReplyButtons from './AutoReplyButtons';

const context = describe;

const handleClickEdit = jest.fn();
const handleClickDelete = jest.fn();

const renderAutoReplyButtons = () => (
  render(<AutoReplyButtons
    onClickEdit={handleClickEdit}
    onClickDelete={handleClickDelete}
  />)
);
describe('<AutoReplyButtons />', () => {
  it('render buttons', () => {
    renderAutoReplyButtons();

    screen.getByAltText('편집');
    screen.getByAltText('삭제');
  });

  context('click edit button', () => {
    it('execute handleClickEdit function', () => {
      renderAutoReplyButtons();

      const editButton = screen.getByAltText('편집');

      fireEvent.click(editButton);

      expect(handleClickEdit).toHaveBeenCalled();
    });
  });

  context('click delete button', () => {
    it('execute handleClickEdit function', () => {
      renderAutoReplyButtons();

      const deleteButton = screen.getByAltText('삭제');

      fireEvent.click(deleteButton);

      expect(handleClickDelete).toHaveBeenCalled();
    });
  });
});
