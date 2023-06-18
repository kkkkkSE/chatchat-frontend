// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import fixtures from '../../fixtures';

const BASE_URL = process.env.API_BASE_URL;

const companyHandlers = [
  rest.post(`${BASE_URL}/companies`, (req, res, ctx) => res(ctx.status(201))),
  rest.get(`${BASE_URL}/companies/me`, (req, res, ctx) => {
    const { company } = fixtures;

    return res(
      ctx.status(200),
      ctx.json({ company }),
    );
  }),
  rest.post(`${BASE_URL}/companies/me`, (req, res, ctx) => res(ctx.status(204))),
  rest.post(`${BASE_URL}/companies/me/password`, (req, res, ctx) => res(ctx.status(204))),
  rest.delete(`${BASE_URL}/companies/me`, (req, res, ctx) => res(ctx.status(204))),
  rest.post(`${BASE_URL}/company/session`, (req, res, ctx) => res(ctx.status(201))),
  rest.get(`${BASE_URL}/company/chatrooms`, (req, res, ctx) => {
    const { chatRooms } = fixtures;

    return res(
      ctx.status(200),
      ctx.json({ chatRooms }),
    );
  }),
  rest.get(`${BASE_URL}/company/chatrooms/:id`, (req, res, ctx) => {
    const { chatRoom } = fixtures;

    return res(
      ctx.status(200),
      ctx.json({ chatRoom }),
    );
  }),
  rest.get(`${BASE_URL}/auto-replies`, (req, res, ctx) => {
    const { autoReplies } = fixtures;

    return res(
      ctx.status(200),
      ctx.json({ autoReplies }),
    );
  }),
  rest.post(`${BASE_URL}/auto-replies`, (req, res, ctx) => res(ctx.status(201))),
  rest.patch(`${BASE_URL}/auto-replies/:id`, (req, res, ctx) => res(ctx.status(204))),
  rest.delete(`${BASE_URL}/auto-replies/:id`, (req, res, ctx) => res(ctx.status(204))),
];

export default companyHandlers;
