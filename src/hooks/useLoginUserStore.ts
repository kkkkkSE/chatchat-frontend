import { container } from 'tsyringe';

import { useStore } from 'usestore-ts';

import LoginUserStore from '../stores/LoginUserStore';

const useLoginUserStore = () => {
  const store = container.resolve(LoginUserStore);

  return useStore(store);
};

export default useLoginUserStore;
