// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { VALID_ACCESS_TOKEN, VALID_REFRESH_TOKEN } from '../../../fixtures/constants';

const BASE_URL = process.env.API_BASE_URL;

const commonHandlers = [
  rest.post(`${BASE_URL}/messages`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${BASE_URL}/messages/auto`, (req, res, ctx) => res(ctx.status(201))),
  rest.post(`${BASE_URL}/messages/auto/:id`, (req, res, ctx) => res(ctx.status(201))),
  rest.post(`${BASE_URL}/token`, (req, res, ctx) => {
    const { refreshToken } = req.cookies;

    if (refreshToken !== VALID_REFRESH_TOKEN) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(201),
      ctx.json({ accessToken: VALID_ACCESS_TOKEN }),
    );
  }),
];

export default commonHandlers;
