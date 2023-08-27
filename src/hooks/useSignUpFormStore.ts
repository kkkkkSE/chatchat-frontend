import { container } from 'tsyringe';

import { useStore } from 'usestore-ts';

import SignUpFormStore from '../stores/SignUpFormStore';

const useSignUpFormStore = () => {
  const store = container.resolve(SignUpFormStore);

  return useStore(store);
};

export default useSignUpFormStore;
