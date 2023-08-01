import { container } from 'tsyringe';

import { useStore } from 'usestore-ts';

import ProfileEditStore from '../stores/ProfileEditStore';

const useProfileEditStore = () => {
  const store = container.resolve(ProfileEditStore);

  return useStore(store);
};

export default useProfileEditStore;
