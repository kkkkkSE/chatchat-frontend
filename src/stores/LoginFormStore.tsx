import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { AxiosError } from 'axios';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
export default class LoginFormStore {
  type = '';

  username = '';

  password = '';

  accessToken = '';

  errorMessage = '';

  @Action()
  setType(type: string) {
    this.type = type;
  }

  @Action()
  changeUsername(username: string) {
    this.username = username;
  }

  @Action()
  changePassword(password: string) {
    this.password = password;
  }

  @Action()
  private setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  @Action()
  private setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  @Action()
  reset() {
    this.username = '';
    this.password = '';
    this.accessToken = '';
  }

  @Action()
  validate() {
    if (this.username.length < 1) {
      throw new Error('아이디를 입력해주세요');
    } else if (this.password.length < 1) {
      throw new Error('비밀번호를 입력해주세요');
    }
  }

  async login() {
    try {
      this.validate();

      const accessToken = await apiService.login({
        type: this.type ?? '',
        username: this.username,
        password: this.password,
      });

      this.setAccessToken(accessToken);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 400) {
          e.message = '아이디 혹은 비밀번호가 맞지 않습니다';
        }
      }

      if (e instanceof Error) {
        this.setErrorMessage(e.message);
      }
    }
  }
}
