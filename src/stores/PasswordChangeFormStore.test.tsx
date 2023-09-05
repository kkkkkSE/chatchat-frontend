import PasswordChangeFormStore from './PasswordChangeFormStore';

const context = describe;

const changePassword = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      changePassword,
    };
  },
}));

describe('SignUpFormStore', () => {
  let store: PasswordChangeFormStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new PasswordChangeFormStore();
  });

  describe('validate and change password', () => {
    const params = {
      type: 'company',
      password: 'password1',
      newPassword: 'newPassword1',
      confirmNewPassword: 'newPassword1',
    };

    beforeEach(() => {
      store.reset();
    });

    context('empty password', () => {
      const errorMessage = '비밀번호를 입력해주세요';

      it(`errorMessage set to ${errorMessage}`, async () => {
        await store.changePassword({
          ...params,
          password: '',
        });

        expect(store.errorMessage).toBe(errorMessage);
      });
    });

    describe('validate new password', () => {
      context('empty new password', () => {
        const errorMessage = '새 비밀번호를 입력해주세요';

        it(`errorMessage set to ${errorMessage}`, async () => {
          await store.changePassword({
            ...params,
            newPassword: '',
          });

          expect(store.errorMessage).toBe(errorMessage);
        });
      });

      context('empty confirm new password', () => {
        const errorMessage = '비밀번호 확인을 입력해주세요';

        it(`errorMessage set to ${errorMessage}`, async () => {
          await store.changePassword({
            ...params,
            confirmNewPassword: '',
          });

          expect(store.errorMessage).toBe(errorMessage);
        });
      });

      context('wrong new password', () => {
        const errorMessage = '새 비밀번호를 다시 확인해주세요';

        it(`errorMessage set to ${errorMessage}`, async () => {
          await store.changePassword({
            ...params,
            newPassword: 'wrong',
          });

          expect(store.errorMessage).toBe(errorMessage);
        });
      });

      context('different new password', () => {
        const errorMessage = '새 비밀번호가 일치하지 않습니다';

        it(`errorMessage set to ${errorMessage}`, async () => {
          await store.changePassword({
            ...params,
            confirmNewPassword: 'different1',
          });

          expect(store.errorMessage).toBe(errorMessage);
        });
      });
    });

    context('when API responds with success', () => {
      it('done is set to true', async () => {
        await store.changePassword({
          ...params,
        });

        expect(changePassword).toBeCalled();

        expect(store.done).toBe(true);
        expect(store.errorMessage).toHaveLength(0);
      });
    });

    context('when API responds with error', () => {
      const errorMessage = 'Error!';

      beforeEach(() => {
        changePassword.mockRejectedValue(Error(errorMessage));
      });

      it('errorMessage set to error message', async () => {
        await store.changePassword({
          ...params,
        });

        expect(changePassword).toBeCalled();

        expect(store.done).toBe(false);
        expect(store.errorMessage).toBe(errorMessage);
      });
    });
  });
});
