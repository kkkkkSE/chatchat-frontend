import commonHandlers from './common';
import companyHandlers from './company';
import customerHandlers from './customer';

const handlers = [
  ...companyHandlers,
  ...customerHandlers,
  ...commonHandlers,
];

export default handlers;
