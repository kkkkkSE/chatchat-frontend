import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router';

import routes from './routes';

const context = describe;

const setupRouterProvider = (path: string) => {
	const router = createMemoryRouter(routes, {initialEntries: [path]});
	render((<RouterProvider router={router} />));
};

describe('routes', () => {
	context('when the current path is “/”', () => {
		it('renders <HomePage />', () => {
			setupRouterProvider('/');

			screen.getByText(/type/);
		});
	});
});
