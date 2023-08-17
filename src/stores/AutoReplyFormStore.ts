import { AxiosError } from 'axios';

import { singleton } from 'tsyringe';

import { Action, Store } from 'usestore-ts';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
export default class AutoReplyFormStore {
  errorMessage = '';

  done = false;

  @Action()
  reset() {
    this.errorMessage = '';

    this.done = false;
  }

  @Action()
  setDone() {
    this.done = true;

    this.errorMessage = '';
  }

  @Action()
  setErrorMessage(message: string) {
    this.errorMessage = message;

    this.done = false;
  }

  @Action()
  async addAutoReply(
    question: string,
    answer: string,
  ) {
    try {
      // react-hook-form data value 초기값 undefined
      if (!question || !question.trim()) {
        throw Error('질문을 작성해주세요');
      }

      if (!answer || !answer.trim()) {
        throw Error('답변을 작성해주세요');
      }

      await apiService.createAutoReply({
        question,
        answer,
      });

      this.setDone();
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 440) {
          this.setErrorMessage(e.response?.data);

          return;
        }
      }

      if (e instanceof Error) {
        this.setErrorMessage(e.message);
      }
    }
  }

  @Action()
  async modifyAutoReply(
    id: number,
    question: string,
    answer: string,
  ) {
    try {
      // react-hook-form data value 초기값 undefined
      if (!question || !question.trim()) {
        throw Error('질문을 작성해주세요');
      }

      if (!answer || !answer.trim()) {
        throw Error('답변을 작성해주세요');
      }

      await apiService.modifyAutoReply({
        id,
        question,
        answer,
      });

      this.setDone();
    } catch (e) {
      if (e instanceof Error) {
        this.setErrorMessage(e.message);
      }
    }
  }
}
