const { I } = inject();

const BACKDOOR_BASE_URL = 'https://chatchat-web.site/backdoor';

export = {
  setupCompanyDatabase() {
    I.amOnPage(`${BACKDOOR_BASE_URL}/companies`);
    I.see('ok');
  },
  setupCustomerDatabase() {
    I.amOnPage(`${BACKDOOR_BASE_URL}/customers`);
    I.see('ok');
  },
}
