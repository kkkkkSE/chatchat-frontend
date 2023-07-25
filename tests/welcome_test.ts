import { STATIC_ROUTES } from '../src/constants/routes';

Feature('welcome');

Scenario('test something', ({ I }) => {
  I.amOnPage(STATIC_ROUTES.HOME);

  I.see('CHATCHAT');
});
