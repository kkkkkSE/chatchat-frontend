import { container } from 'tsyringe';

import { useStore } from 'usestore-ts';

import ChatRoomStore from '../stores/ChatRoomStore';

const useChatRoomStore = () => {
  const store = container.resolve(ChatRoomStore);

  return useStore(store);
};

export default useChatRoomStore;
