import { AxiosError } from 'axios';
import { singleton } from 'tsyringe';

import { Action, Store } from 'usestore-ts';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class PasswordChangeFormStore {
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

    this.done = false;
  }

  @Action()
  setDone() {
    this.done = true;

    this.errorMessage = '';
  }

  @Action()
  validPassword(password: string) {
    if (!password) {
      this.setErrorMessage('비밀번호를 입력해주세요');

      return false;
    }

    return true;
  }

  @Action()
  validNewPassword(password: string, confirmPassword: string) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d~!@#$%^&*()-_=+]{8,40}$/;

    if (!password) {
      this.setErrorMessage('새 비밀번호를 입력해주세요');

      return false;
    }

    if (!confirmPassword) {
      this.setErrorMessage('비밀번호 확인을 입력해주세요');

      return false;
    }

    if (!regex.test(password)) {
      this.setErrorMessage('새 비밀번호를 다시 확인해주세요');

      return false;
    }

    if (password !== confirmPassword) {
      this.setErrorMessage('새 비밀번호가 일치하지 않습니다');

      return false;
    }

    return true;
  }

  @Action()
  async changePassword({
    type, password, newPassword, confirmNewPassword,
  }: {
    type: string;
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    try {
      if (!this.validPassword(password)) return;

      if (!this.validNewPassword(newPassword, confirmNewPassword)) return;

      await apiService.changePassword({
        type, password, newPassword, confirmNewPassword,
      });

      this.setDone();
    } catch (e) {
      if (e instanceof AxiosError) {
        this.setErrorMessage(e.response?.data);

        return;
      }

      if (e instanceof Error) {
        this.setErrorMessage(e.message);
      }
    }
  }
}

export default PasswordChangeFormStore;
