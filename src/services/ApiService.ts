/* eslint-disable no-param-reassign */
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || '';

const TYPES_PLURAL : Record<string, string> = {
  company: 'companies',
  customer: 'customers',
};

export default class ApiService {
  private instance : AxiosInstance;

  type : string = localStorage.getItem('userType')?.slice(1, -1) || '';

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
    });

    this.instance.interceptors.request.use((config) => {
      if (config.url === '/token' || config.url === '/login') {
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

  setType(type:string) {
    this.type = type;
  }

  async login({ username, password } : {
    username: string;
    password: string;
  }) {
    const { data } = await this.instance.post(
      `/${this.type}/session`,
      { username, password },
    );
    const { accessToken } = data;

    return accessToken;
  }

  async reissueToken() {
    try {
      const { data } = await this.instance.post(
        '/token',
      );

      const { accessToken } = data;

      localStorage.setItem('accessToken', `"${accessToken}"`);

      return accessToken;
    } catch (error) {
      localStorage.removeItem('accessToken');

      window.location.href = '/';

      return error;
    }
  }

  async fetchChatList({ page } : {
    page?: number
  }) {
    const { data } = await this.instance.get(`/${this.type}/chatrooms`, { params: { page } });

    return data;
  }

  async fetchMyProfile() {
    const { data } = await this.instance.get(`/${TYPES_PLURAL[this.type]}/me`);

    return data;
  }
}

export const apiService = new ApiService();
