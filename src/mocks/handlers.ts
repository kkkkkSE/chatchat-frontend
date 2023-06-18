import commonHandlers from './commonHandlers';
import companyHandlers from './companyHandlers';
import customerHandlers from './customerHandlers';

const handlers = [
  ...companyHandlers,
  ...customerHandlers,
  ...commonHandlers,
];

export default handlers;
