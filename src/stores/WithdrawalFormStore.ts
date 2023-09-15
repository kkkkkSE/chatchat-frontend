import { singleton } from 'tsyringe';

import { Action, Store } from 'usestore-ts';

import { AxiosError } from 'axios';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
export default class WithdrawalFormStore {
  errorMessage = '';

  done = false;

  @Action()
  reset() {
    this.errorMessage = '';
    this.done = false;
  }

  @Action()
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  @Action()
  setDone() {
    this.done = true;
  }

  @Action()
  validPassword(password: string) {
    if (!password) {
      this.setErrorMessage('비밀번호를 입력해주세요');

      return false;
    }

    return true;
  }

  async withdrawal({ type, password }:{
    type: string,
    password: string
  }) {
    try {
      if (!this.validPassword(password)) return;

      await apiService.withdrawal({
        type,
        password,
      });

      this.setDone();
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 481) {
          this.setErrorMessage(e.response?.data);

          return;
        }
      }

      if (e instanceof Error) {
        this.setErrorMessage(e.message);
      }
    }
  }
}
