// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const BASE_URL = process.env.API_BASE_URL;

const commonHandlers = [
  rest.post(`${BASE_URL}/messages`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${BASE_URL}/messages/auto`, (req, res, ctx) => res(ctx.status(201))),
  rest.post(`${BASE_URL}/messages/auto/:id`, (req, res, ctx) => res(ctx.status(201))),
  rest.post(`${BASE_URL}/token`, (req, res, ctx) => {
    const { refreshToken } = req.cookies;

    if (refreshToken !== 'VALIDREFRESHTOKEN') {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(201),
      ctx.json({ accessToken: 'VALIDACCESSTOKEN' }),
    );
  }),
];

export default commonHandlers;
