import common from './common';
import company from './company';
import customer from './customer';

const handlers = [
  ...company,
  ...customer,
  ...common,
];

export default handlers;
