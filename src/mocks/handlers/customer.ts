// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import fixtures from '../../../fixtures';

import isValidAccessToken from '../isValidAccessToken';

const BASE_URL = process.env.API_BASE_URL;

const customerHandlers = [
  rest.post(`${BASE_URL}/customer/session`, async (req, res, ctx) => {
    const { username, password } = await req.json();

    if (username === 'customer1' && password === 'Password1234!') {
      return res(
        ctx.status(201),
        ctx.json({ accessToken: 'VALIDACCESSTOKEN' }),
        ctx.cookie('refreshToken', 'VALIDREFRESHTOKEN'),
      );
    }

    return res(ctx.status(400));
  }),
  rest.post(`${BASE_URL}/customers`, async (req, res, ctx) => {
    const { username, password, confirmPassword } = await req.json();

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (username === 'customer1') {
      return res(ctx.status(400), ctx.json({ message: '해당 아이디는 사용할 수 없습니다' }));
    }
    if (!usernameRegex.test(username)) {
      return res(ctx.status(400), ctx.json({ message: '아이디를 다시 확인해주세요' }));
    }
    if (!passwordRegex.test(password)) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호를 다시 확인해주세요' }));
    }
    if (password !== confirmPassword) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 일치하지 않습니다' }));
    }

    return res(ctx.status(201));
  }),
  rest.get(`${BASE_URL}/customers/me`, (req, res, ctx) => {
    const { customer } = fixtures;

    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ customer }),
    );
  }),
  rest.patch(`${BASE_URL}/customers/me`, (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(ctx.status(204));
  }),
  rest.patch(`${BASE_URL}/customers/me/password`, async (req, res, ctx) => {
    const {
      password, newPassword, confirmPassword,
    } = await req.json();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    if (password !== 'Password1234!') {
      return res(ctx.status(400), ctx.json({ message: '기존 비밀번호가 맞지 않습니다' }));
    }

    if (newPassword !== confirmPassword) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 일치하지 않습니다' }));
    }

    if (!passwordRegex.test(newPassword)) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호를 다시 확인해주세요' }));
    }

    return res(ctx.status(400));
  }),
  rest.get(`${BASE_URL}/customers/me`, (req, res, ctx) => {
    const { customer } = fixtures;

    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ customer }),
    );
  }),
  rest.delete(`${BASE_URL}/customers/me`, async (req, res, ctx) => {
    const { password } = await req.json();

    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    if (password !== 'Password1234!') {
      return res(ctx.status(400), ctx.json({ message: '기존 비밀번호가 맞지 않습니다' }));
    }

    return res(ctx.status(204));
  }),

  rest.get(`${BASE_URL}/customer/chatrooms`, (req, res, ctx) => {
    const { chatRooms } = fixtures;

    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ chatRooms }),
    );
  }),
  rest.get(`${BASE_URL}/customer/chatrooms/:id`, (req, res, ctx) => {
    const { chatRoom } = fixtures;

    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ chatRoom }),
    );
  }),
  rest.get(`${BASE_URL}/companies`, async (req, res, ctx) => {
    const { companies } = fixtures;

    const keyword = req.url.searchParams.get('keyword');

    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    if (keyword) {
      const filteredCompanies = companies.filter((company) => company.name.includes(keyword));

      return res(
        ctx.status(200),
        ctx.json({ filteredCompanies }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ companies }),
    );
  }),
  rest.get(`${BASE_URL}/companies/:id`, (req, res, ctx) => {
    const { companies } = fixtures;
    const company = companies[0];

    const authorization = req.headers.get('Authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : '';

    if (!authorization || !isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ company }),
    );
  }),
];

export default customerHandlers;
