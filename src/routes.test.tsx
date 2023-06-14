import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router';
import {ThemeProvider} from 'styled-components';

import routes from './routes';
import defaultTheme from './styles/defaultTheme';

const context = describe;

const setupRouterProvider = (path: string) => {
	const router = createMemoryRouter(routes, {initialEntries: [path]});
	render(
		<ThemeProvider theme={defaultTheme}>
			<RouterProvider router={router} />
		</ThemeProvider>,
	);
};

describe('routes', () => {
	context('when the current path is “/”', () => {
		it('renders <HomePage />', () => {
			setupRouterProvider('/');

			screen.getByText(/회원 유형을 선택해주세요/);
		});
	});

	context('when the current path is “/login”', () => {
		it('renders <HomePage />', () => {
			setupRouterProvider('/login');

			screen.getByLabelText(/아이디/);
			screen.getByRole('button', {name: /로그인/});
		});
	});

	context('when the current path is “/sign-up', () => {
		it('renders <HomePage />', () => {
			setupRouterProvider('/sign-up');

			screen.getByLabelText(/비밀번호 확인/);
			screen.getByRole('button', {name: /가입하기/});
		});
	});
});
