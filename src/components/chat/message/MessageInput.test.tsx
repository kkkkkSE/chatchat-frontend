import { fireEvent, screen, waitFor } from '@testing-library/react';

import { render as customRender } from '../../../test-helper';

import MessageInput from './MessageInput';

const context = describe;

const sendMessage = jest.fn();

jest.mock('../../../hooks/useSockJS', () => () => ({ sendMessage }));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: jest.fn(),
    handleSubmit: jest.fn(
      (callback) => (data : Record<string, string>) => callback(data),
    ),
    reset: jest.fn(),
  }),
  Controller: jest.fn().mockImplementation(({ render }) => render({
    field: { value: 'testValue', onChange: jest.fn() },
  })),
}));

describe('<MessageInput />', () => {
  it('render message input', () => {
    customRender(<MessageInput chatRoomId={1} />);

    screen.getByPlaceholderText(/메세지 입력/);
    screen.getByRole('button', { name: '전송' });
  });

  context('submit form', () => {
    it('execute sendMessage funtion', async () => {
      customRender(<MessageInput chatRoomId={1} />);

      fireEvent.submit(screen.getByTestId('message-form'));

      await waitFor(() => {
        expect(sendMessage).toHaveBeenCalled();
      });
    });
  });
});
