/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
import {setHeadlessWhen, setCommonPlugins} from '@codeceptjs/configure';
// Turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// Enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

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
