import SignUpFormStore from './SignUpFormStore';

const context = describe;

const signUp = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      signUp,
    };
  },
}));

describe('SignUpFormStore', () => {
  let store: SignUpFormStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new SignUpFormStore();
  });

  describe('validate and sign up', () => {
    const params = {
      type: 'company',
      name: '이름',
      username: 'company',
      password: 'password1',
      confirmPassword: 'password1',
    };

    beforeEach(() => {
      store.reset();
    });

    describe('validate name', () => {
      describe('empty name', () => {
        context('user type is company', () => {
          const errorMessage = '기업명을 입력해주세요';

          it(`errorMessage set to ${errorMessage}`, async () => {
            await store.signUp({
              ...params,
              type: 'company',
              name: '',
            });

            expect(store.errorMessage).toBe(errorMessage);
          });
        });

        context('user type is customer', () => {
          const errorMessage = '이름을 입력해주세요';

          it(`errorMessage set to ${errorMessage}`, async () => {
            await store.signUp({
              ...params,
              type: 'customer',
              name: '',
            });

            expect(store.errorMessage).toBe(errorMessage);
          });
        });
      });
    });

    describe('validate username', () => {
      context('empty username', () => {
        const errorMessage = '아이디를 입력해주세요';

        it(`errorMessage set to ${errorMessage}`, async () => {
          await store.signUp({
            ...params,
            username: '',
          });

          expect(store.errorMessage).toBe(errorMessage);
        });
      });

      describe('wrong username', () => {
        const errorMessage = '아이디를 다시 확인해주세요';

        context('too short username', () => {
          it(`errorMessage set to ${errorMessage}`, async () => {
            await store.signUp({
              ...params,
              username: 'short',
            });

            expect(store.errorMessage).toBe(errorMessage);
          });
        });

        context('korean username', () => {
          it(`errorMessage set to ${errorMessage}`, async () => {
            await store.signUp({
              ...params,
              username: '한글아이디',
            });

            expect(store.errorMessage).toBe(errorMessage);
          });
        });

        context('username with special characters', () => {
          it(`errorMessage set to ${errorMessage}`, async () => {
            await store.signUp({
              ...params,
              username: 'company-username',
            });

            expect(store.errorMessage).toBe(errorMessage);
          });
        });
      });
    });

    describe('validate password', () => {
      context('empty password', () => {
        const errorMessage = '비밀번호를 입력해주세요';

        it(`errorMessage set to ${errorMessage}`, async () => {
          await store.signUp({
            ...params,
            password: '',
          });

          expect(store.errorMessage).toBe(errorMessage);
        });
      });

      describe('wrong password', () => {
        const errorMessage = '비밀번호를 다시 확인해주세요';

        context('too short password', () => {
          it(`errorMessage set to ${errorMessage}`, async () => {
            await store.signUp({
              ...params,
              password: 'short-pw',
            });
          });
        });

        context('password that is only string', () => {
          it(`errorMessage set to ${errorMessage}`, async () => {
            await store.signUp({
              ...params,
              password: 'onlystring',
            });

            expect(store.errorMessage).toBe(errorMessage);
          });
        });

        context('password that is only number', () => {
          it(`errorMessage set to ${errorMessage}`, async () => {
            await store.signUp({
              ...params,
              password: '12345678',
            });

            expect(store.errorMessage).toBe(errorMessage);
          });
        });
      });
    });

    describe('validate confirmPassword', () => {
      context('empty confirmPassword', () => {
        const errorMessage = '비밀번호 확인을 입력해주세요';

        it(`errorMessage set to ${errorMessage}`, async () => {
          await store.signUp({
            ...params,
            confirmPassword: '',
          });

          expect(store.errorMessage).toBe(errorMessage);
        });
      });

      context('wrong confirmPassword', () => {
        const errorMessage = '비밀번호가 일치하지 않습니다';

        it(`errorMessage set to ${errorMessage}`, async () => {
          await store.signUp({
            ...params,
            password: 'password1',
            confirmPassword: 'password2',
          });

          expect(store.errorMessage).toBe(errorMessage);
        });
      });
    });

    context('when API responds with success', () => {
      it('done is set to true', async () => {
        await store.signUp({
          ...params,
        });

        expect(signUp).toBeCalled();

        expect(store.done).toBe(true);
        expect(store.errorMessage).toHaveLength(0);
      });
    });

    context('when API responds with error', () => {
      const errorMessage = 'Error!';

      beforeEach(() => {
        signUp.mockRejectedValue(Error(errorMessage));
      });

      it('errorMessage set to error message', async () => {
        await store.signUp({
          ...params,
        });

        expect(signUp).toBeCalled();

        expect(store.done).toBe(false);
        expect(store.errorMessage).toBe(errorMessage);
      });
    });
  });
});
