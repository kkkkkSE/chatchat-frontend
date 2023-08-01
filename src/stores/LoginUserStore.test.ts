import fixtures from '../../fixtures';

import LoginUserStore from './LoginUserStore';

const context = describe;

const fetchLoginUser = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      fetchLoginUser,
    };
  },
}));

describe('LoginUserStore', () => {
  let store: LoginUserStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new LoginUserStore();
  });

  describe('fetch logged in user data', () => {
    const userType = 'company';

    const profile = fixtures.company;

    context('when API responds with success', () => {
      fetchLoginUser.mockReturnValue(profile);

      it('execute apiService`s fetchLoginUser', async () => {
        await store.fetchLoginUser(userType);

        expect(fetchLoginUser).toBeCalledWith({ type: userType });

        expect(store.error).toBe(false);
      });
    });

    context('when API responds with error', () => {
      const errorMessage = 'error!';

      beforeEach(() => {
        fetchLoginUser.mockRejectedValue(Error(errorMessage));
      });

      it('sets error message', async () => {
        await store.fetchLoginUser(userType);

        expect(store.error).toBe(true);
      });
    });
  });
});
