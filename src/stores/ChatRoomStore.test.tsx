import ChatRoomStore from './ChatRoomStore';

import fixtures from '../../fixtures';

const context = describe;

const fetchChatRoom = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      fetchChatRoom,
    };
  },
}));

describe('ChatRoomStore', () => {
  let store: ChatRoomStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new ChatRoomStore();
  });

  describe('increasePage', () => {
    it('page increments by 1', () => {
      expect(store.page).toBe(1);

      store.increasePage();

      expect(store.page).toBe(2);
    });
  });

  describe('addMessage', () => {
    const messages = [...fixtures.messages];

    const lastMessage = messages[messages.length - 1];

    const newMessage = {
      id: lastMessage.id + 1,
      senderId: lastMessage.senderId,
      content: '새 메세지',
      createdAt: lastMessage.createdAt,
    };

    it('add new message to the end of messages array', async () => {
      store.messages = messages;

      expect(store.messages.at(-1)).toBe(lastMessage);

      store.addMessage(newMessage);

      expect(store.messages.at(-1)).toBe(newMessage);
    });
  });

  describe('setMessages', () => {
    const messages = [...fixtures.messages];

    const prevMessages = new Array(3).map((_, index) => ({
      id: 0,
      senderId: 0,
      content: `이전 메세지 ${index + 1}`,
      createdAt: '',
    }));

    it('next page messages (prev messages) is placed in front of existing messages', () => {
      store.messages = messages;

      expect(store.messages[0]).toBe(messages[0]);

      store.setMessages(prevMessages);

      expect(store.messages[0]).toBe(prevMessages[0]);
    });
  });

  describe('fetch Data', () => {
    const userType = 'company';

    const chatRoomId = 1;

    context('when API responds with success', () => {
      fetchChatRoom.mockReturnValue({
        page: fixtures.page,
        ...fixtures.chatRoom,
      });

      it('execute apiService`s fetchChatRoom', async () => {
        await store.fetchChatRoom(userType, chatRoomId);

        expect(fetchChatRoom).toBeCalledWith({
          type: userType,
          id: chatRoomId,
          page: store.page,
        });

        expect(store.loading).toBe(false);
        expect(store.error).toBe(false);
      });
    });

    context('when API responds with error', () => {
      beforeEach(() => {
        fetchChatRoom.mockRejectedValue(Error('error!'));
      });

      it('sets error is true', async () => {
        await store.fetchChatRoom(userType, chatRoomId);

        expect(store.loading).toBe(false);
        expect(store.error).toBe(true);
      });
    });
  });
});
