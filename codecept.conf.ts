// eslint-disable-next-line import/no-extraneous-dependencies
import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';

setHeadlessWhen(process.env.HEADLESS);

setCommonPlugins();

// eslint-disable-next-line import/prefer-default-export
export const config = {
  tests: './tests/**/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:8080',
      show: true,
      browser: 'chromium',
    },
  },
  include: {
    I: './tests/steps_file.ts',
  },
  name: 'chatchat-frontend',
};
