import AutoReplyFormStore from './AutoReplyFormStore';

const context = describe;

const createAutoReply = jest.fn();
const modifyAutoReply = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      createAutoReply,
      modifyAutoReply,
    };
  },
}));

describe('ChatRoomStore', () => {
  let store: AutoReplyFormStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new AutoReplyFormStore();
  });

  describe('add data', () => {
    const params = {
      question: '',
      answer: '',
    };

    context('empty question', () => {
      const errorMessage = '질문을 작성해주세요';

      it(`errorMessage set to ${errorMessage}`, async () => {
        await store.addAutoReply(params.question, params.answer);

        expect(store.errorMessage).toBe(errorMessage);
      });
    });

    context('empty answer', () => {
      const errorMessage = '답변을 작성해주세요';

      beforeEach(() => {
        params.question = 'question';
      });

      it(`errorMessage set to ${errorMessage}`, async () => {
        await store.addAutoReply(params.question, params.answer);

        expect(store.errorMessage).toBe(errorMessage);
      });
    });

    context('when API responds with success', () => {
      beforeEach(() => {
        params.answer = 'answer';
      });

      it('done set to true', async () => {
        await store.addAutoReply(params.question, params.answer);

        expect(createAutoReply).toBeCalledWith(params);

        expect(store.done).toBe(true);
        expect(store.errorMessage).toBe('');
      });
    });

    context('when API responds with error', () => {
      const errorMessage = 'Error Message';

      beforeEach(() => {
        createAutoReply.mockRejectedValue(Error(errorMessage));
      });

      it('errorMessage set to error message', async () => {
        await store.addAutoReply(params.question, params.answer);

        expect(createAutoReply).toBeCalledWith(params);

        expect(store.done).toBe(false);
        expect(store.errorMessage).toBe(errorMessage);
      });
    });
  });

  describe('modify data', () => {
    const params = {
      id: 1,
      question: '',
      answer: '',
    };

    context('empty question', () => {
      const errorMessage = '질문을 작성해주세요';

      it(`errorMessage set to ${errorMessage}`, async () => {
        await store.modifyAutoReply(params.id, params.question, params.answer);

        expect(store.errorMessage).toBe(errorMessage);
      });
    });

    context('empty answer', () => {
      const errorMessage = '답변을 작성해주세요';

      beforeEach(() => {
        params.question = 'question';
      });

      it(`errorMessage set to ${errorMessage}`, async () => {
        await store.modifyAutoReply(params.id, params.question, params.answer);

        expect(store.errorMessage).toBe(errorMessage);
      });
    });

    context('when API responds with success', () => {
      beforeEach(() => {
        params.answer = 'answer';
      });

      it('done set to true', async () => {
        await store.modifyAutoReply(params.id, params.question, params.answer);

        expect(modifyAutoReply).toBeCalledWith(params);

        expect(store.done).toBe(true);
        expect(store.errorMessage).toBe('');
      });
    });

    context('when API responds with error', () => {
      const errorMessage = 'Error Message';

      beforeEach(() => {
        modifyAutoReply.mockRejectedValue(Error(errorMessage));
      });

      it('errorMessage set to error message', async () => {
        await store.modifyAutoReply(params.id, params.question, params.answer);

        expect(modifyAutoReply).toBeCalledWith(params);

        expect(store.done).toBe(false);
        expect(store.errorMessage).toBe(errorMessage);
      });
    });
  });
});
