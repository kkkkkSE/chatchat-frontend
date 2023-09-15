import { fireEvent, screen, waitFor } from '@testing-library/react';

import { render } from '../../test-helper';

import WithdrawalNotice from './WithdrawalNotice';

const context = describe;

const setIsAgree = jest.fn();

describe('<WithdrawalNotice />', () => {
  it('render notice about withdrawal', () => {
    render(<WithdrawalNotice setIsAgree={setIsAgree} />);

    screen.getByText('계정 탈퇴 시 주의사항');
  });

  context('when click "동의하고 계속하기" button', () => {
    it('execute setIsAgree function with true', async () => {
      render(<WithdrawalNotice setIsAgree={setIsAgree} />);

      const button = screen.getByRole('button', { name: '동의하고 계속하기' });

      fireEvent.click(button);

      await waitFor(() => {
        expect(setIsAgree).toHaveBeenCalledWith(true);
      });
    });
  });
});
