import { AxiosError } from 'axios';

import { singleton } from 'tsyringe';

import { Action, Store } from 'usestore-ts';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class SignUpFormStore {
  errorMessage = '';

  done = false;

  @Action()
  reset() {
    this.errorMessage = '';

    this.done = false;
  }

  @Action()
  validName(type: string, name: string) {
    const label = (type === 'company') ? '기업명' : '이름';

    if (!name || (name && !name.trim())) {
      this.setErrorMessage(`${label}을 입력해주세요`);

      return false;
    }

    return true;
  }

  @Action()
  validUsername(username: string) {
    const regex = /^[a-zA-Z0-9]{6,20}$/;

    if (!username) {
      this.setErrorMessage('아이디를 입력해주세요');

      return false;
    }

    if (!regex.test(username)) {
      this.setErrorMessage('아이디를 다시 확인해주세요');

      return false;
    }

    return true;
  }

  @Action()
  validPassword(password: string, confirmPassword: string) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d~!@#$%^&*()-_=+]{8,40}$/;

    if (!password) {
      this.setErrorMessage('비밀번호를 입력해주세요');

      return false;
    }

    if (!confirmPassword) {
      this.setErrorMessage('비밀번호 확인을 입력해주세요');

      return false;
    }

    if (!regex.test(password)) {
      this.setErrorMessage('비밀번호를 다시 확인해주세요');

      return false;
    }

    if (password !== confirmPassword) {
      this.setErrorMessage('비밀번호가 일치하지 않습니다');

      return false;
    }

    return true;
  }

  @Action()
  setErrorMessage(message: string) {
    this.errorMessage = message;

    this.done = false;
  }

  @Action()
  setDone() {
    this.errorMessage = '';

    this.done = true;
  }

  @Action()
  async signUp({
    type, name, username, password, confirmPassword,
  }: {
    type: string;
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      if (!this.validName(type, name)) return;

      if (!this.validUsername(username)) return;

      if (!this.validPassword(password, confirmPassword)) return;

      await apiService.signUp({
        type, name, username, password, confirmPassword,
      });

      this.setDone();
    } catch (e) {
      if (e instanceof AxiosError) {
        this.setErrorMessage(e.response?.data?.message);

        return;
      }

      if (e instanceof Error) {
        this.setErrorMessage(e.message);
      }
    }
  }
}

export default SignUpFormStore;
