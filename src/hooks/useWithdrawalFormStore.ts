import { container } from 'tsyringe';

import { useStore } from 'usestore-ts';

import WithdrawalFormStore from '../stores/WithdrawalFormStore';

const useWithdrawalFormStore = () => {
  const store = container.resolve(WithdrawalFormStore);

  return useStore(store);
};

export default useWithdrawalFormStore;
