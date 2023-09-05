import { container } from 'tsyringe';

import { useStore } from 'usestore-ts';

import PasswordChangeFormStore from '../stores/PasswordChangeFormStore';

const usePasswordChangeFormStore = () => {
  const store = container.resolve(PasswordChangeFormStore);

  return useStore(store);
};

export default usePasswordChangeFormStore;
