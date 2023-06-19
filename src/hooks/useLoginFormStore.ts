import { container } from 'tsyringe';
import { useStore } from 'usestore-ts';

import LoginFormStore from '../stores/LoginFormStore';

const useLoginFormStore = () => {
  const store = container.resolve(LoginFormStore);

  return useStore(store);
};

export default useLoginFormStore;
