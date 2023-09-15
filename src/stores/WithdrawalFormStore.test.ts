import WithdrawalFormStore from './WithdrawalFormStore';

const context = describe;

const withdrawal = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      withdrawal,
    };
  },
}));

describe('WithdrawalFormStore', () => {
  let store: WithdrawalFormStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new WithdrawalFormStore();
  });

  describe('validate and withdrawal', () => {
    const params = {
      type: 'company',
      password: 'password1',
    };

    beforeEach(() => {
      store.reset();
    });

    context('empty password', () => {
      const errorMessage = '비밀번호를 입력해주세요';

      it(`errorMessage set to ${errorMessage}`, async () => {
        await store.withdrawal({
          ...params,
          password: '',
        });

        expect(store.errorMessage).toBe(errorMessage);
      });
    });

    context('when API responds with success', () => {
      it('done is set to true', async () => {
        await store.withdrawal({
          ...params,
        });

        expect(withdrawal).toBeCalled();

        expect(store.done).toBe(true);
        expect(store.errorMessage).toHaveLength(0);
      });
    });

    context('when API responds with error', () => {
      const errorMessage = 'Error!';

      beforeEach(() => {
        withdrawal.mockRejectedValue(Error(errorMessage));
      });

      it('errorMessage set to error message', async () => {
        await store.withdrawal({
          ...params,
        });

        expect(withdrawal).toBeCalled();

        expect(store.done).toBe(false);
        expect(store.errorMessage).toBe(errorMessage);
      });
    });
  });
});
