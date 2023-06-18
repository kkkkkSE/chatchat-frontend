// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import fixtures from '../../fixtures';

const BASE_URL = process.env.API_BASE_URL;

const customerHandlers = [
  rest.post(`${BASE_URL}/customers`, (req, res, ctx) => res(ctx.status(201))),
  rest.get(`${BASE_URL}/customers/me`, (req, res, ctx) => {
    const { customer } = fixtures;

    return res(
      ctx.status(200),
      ctx.json({ customer }),
    );
  }),
  rest.post(`${BASE_URL}/customers/me`, (req, res, ctx) => res(ctx.status(204))),
  rest.post(`${BASE_URL}/customers/me/password`, (req, res, ctx) => res(ctx.status(204))),
  rest.delete(`${BASE_URL}/customers/me`, (req, res, ctx) => res(ctx.status(204))),
  rest.post(`${BASE_URL}/customer/session`, (req, res, ctx) => res(ctx.status(201))),
  rest.get(`${BASE_URL}/customer/chatrooms`, (req, res, ctx) => {
    const { chatRooms } = fixtures;

    return res(
      ctx.status(200),
      ctx.json({ chatRooms }),
    );
  }),
  rest.get(`${BASE_URL}/companies`, (req, res, ctx) => {
    const { companies } = fixtures;

    return res(
      ctx.status(200),
      ctx.json({ companies }),
    );
  }),
  rest.get(`${BASE_URL}/companies/:id`, (req, res, ctx) => {
    const { companies } = fixtures;
    const company = companies[0];

    return res(
      ctx.status(200),
      ctx.json({ company }),
    );
  }),
];

export default customerHandlers;
