/* eslint-disable no-param-reassign */
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || '';

const TYPES_PLURAL : Record<string, string> = {
  company: 'companies',
  customer: 'customers',
};

export default class ApiService {
  private instance : AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
    });

    this.instance.interceptors.request.use((config) => {
      if (config.url === '/token' || config.url === '/logout') {
        config.withCredentials = true;

        return config;
      }

      const accessToken = localStorage.getItem('accessToken')?.slice(1, -1);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response: { status } } = error;

        if (status !== 401 || config.url === '/token') {
          return Promise.reject(error);
        }

        const newToken = await this.reissueToken();

        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }

        return axios(config);
      },
    );
  }

  async login({ type, username, password } : {
    type: string;
    username: string;
    password: string;
  }) {
    const { data } = await this.instance.post(
      `/${type}/session`,
      { username, password },
      { withCredentials: true },
    );

    const { accessToken } = data;

    return accessToken;
  }

  async logout() {
    await this.instance.delete('/logout');
  }

  async reissueToken() {
    try {
      const { data } = await this.instance.post('/token');

      const { accessToken } = data;

      localStorage.setItem('accessToken', `"${accessToken}"`);

      return accessToken;
    } catch (error) {
      localStorage.removeItem('accessToken');

      window.location.href = '/';

      return error;
    }
  }

  async fetchChatList({ type, page } : {
    type: string;
    page?: number;
  }) {
    const { data } = await this.instance.get(
      `/${type}/chatrooms`,
      { params: { page } },
    );

    return data;
  }

  async fetchChatRoom({ type, id, page } : {
    type: string;
    id: number;
    page?: number;
  }) {
    const { data } = await this.instance.get(
      `/${type}/chatrooms/${id}`,
      { params: { page } },
    );

    return data;
  }

  async fetchLoginUser({ type } : {
    type: string;
  }) {
    const { data } = await this.instance.get(`/${TYPES_PLURAL[type]}/me`);
    return data;
  }
}

export const apiService = new ApiService();
