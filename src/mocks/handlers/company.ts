// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import fixtures from '../../../fixtures';

import isValidAccessToken from '../isValidAccessToken';

const BASE_URL = process.env.API_BASE_URL;

const companyHandlers = [
  rest.post(`${BASE_URL}/company/session`, async (req, res, ctx) => {
    const { username, password } = await req.json();

    if (username === 'company1' && password === 'Password1234!') {
      return res(
        ctx.status(201),
        ctx.json({ accessToken: 'VAILDACCESSTOKEN' }),
      );
    }

    return res(ctx.status(400));
  }),
  rest.post(`${BASE_URL}/companies`, async (req, res, ctx) => {
    const { username, password, confirmPassword } = await req.json();

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (username === 'company1') {
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
  rest.get(`${BASE_URL}/companies/me`, async (req, res, ctx) => {
    const { company } = fixtures;

    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ company }),
    );
  }),
  rest.patch(`${BASE_URL}/companies/me`, async (req, res, ctx) => {
    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(ctx.status(204));
  }),
  rest.patch(`${BASE_URL}/companies/me/password`, async (req, res, ctx) => {
    const {
      password, newPassword, confirmPassword, accessToken,
    } = await req.json();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

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
  rest.get(`${BASE_URL}/companies/me`, async (req, res, ctx) => {
    const { company } = fixtures;

    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ company }),
    );
  }),
  rest.delete(`${BASE_URL}/companies/me`, async (req, res, ctx) => {
    const { password, accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    if (password !== 'Password1234!') {
      return res(ctx.status(400), ctx.json({ message: '기존 비밀번호가 맞지 않습니다' }));
    }

    return res(ctx.status(204));
  }),

  rest.get(`${BASE_URL}/company/chatrooms`, async (req, res, ctx) => {
    const { chatRooms } = fixtures;

    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ chatRooms }),
    );
  }),
  rest.get(`${BASE_URL}/company/chatrooms/:id`, async (req, res, ctx) => {
    const { chatRoom } = fixtures;

    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ chatRoom }),
    );
  }),
  rest.get(`${BASE_URL}/auto-replies`, async (req, res, ctx) => {
    const { autoReplies } = fixtures;

    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json({ autoReplies }),
    );
  }),
  rest.post(`${BASE_URL}/auto-replies`, async (req, res, ctx) => {
    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(ctx.status(201));
  }),
  rest.patch(`${BASE_URL}/auto-replies/:id`, async (req, res, ctx) => {
    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(ctx.status(204));
  }),
  rest.delete(`${BASE_URL}/auto-replies/:id`, async (req, res, ctx) => {
    const { accessToken } = await req.json();

    if (!isValidAccessToken(accessToken)) return res(ctx.status(401));

    return res(ctx.status(204));
  }),
];

export default companyHandlers;