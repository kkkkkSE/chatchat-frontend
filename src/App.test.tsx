import {render, screen} from '@testing-library/react';

import App from './App';

describe('App', () => {
	it('renders greeting message', () => {
		render(<App />);

		screen.getByText(/type/);
	});
});
