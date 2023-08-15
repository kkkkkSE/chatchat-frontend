import { container } from 'tsyringe';

import { useStore } from 'usestore-ts';

import AutoReplyFormStore from '../stores/AutoReplyFormStore';

const useAutoReplyFormStore = () => {
  const store = container.resolve(AutoReplyFormStore);

  return useStore(store);
};

export default useAutoReplyFormStore;
