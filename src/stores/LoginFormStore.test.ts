import LoginFormStore from './LoginFormStore';

const context = describe;

const userType = 'company';

const login = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      login,
    };
  },
}));

describe('LoginFormStore', () => {
  let store: LoginFormStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new LoginFormStore();
  });

  describe('validate and login', () => {
    beforeEach(() => {
      store.reset();
    });

    context('empty username', () => {
      it('errorMessage set to "아이디를 입력해주세요"', async () => {
        await store.login(userType);

        expect(store.errorMessage).toBe('아이디를 입력해주세요');
      });
    });

    context('empty password', () => {
      beforeEach(() => {
        store.changeUsername('username1');
      });

      it('errorMessage set to "비밀번호를 입력해주세요"', async () => {
        await store.login(userType);

        expect(store.errorMessage).toBe('비밀번호를 입력해주세요');
      });
    });

    context('when API responds with success', () => {
      beforeEach(() => {
        store.changeUsername('username1');
        store.changePassword('password1');
      });

      it('errorMessage set to empty string', async () => {
        await store.login(userType);

        expect(login).toBeCalled();

        expect(store.errorMessage).toHaveLength(0);
      });
    });

    context('when API responds with error', () => {
      beforeEach(() => {
        store.changeUsername('username1');
        store.changePassword('password1');
        login.mockRejectedValue(Error('Error Message'));
      });

      it('errorMessage set to error message', async () => {
        await store.login(userType);

        expect(login).toBeCalled();

        expect(store.errorMessage).toBe('Error Message');
      });
    });
  });
});
