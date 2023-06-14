import PreLoginLayout from './components/PreLoginLayout';
import HomePage from './pages/HomePage';

const routes = [
	{element: <PreLoginLayout />, children: [
		{path: '/', element: <HomePage />},
	]},
];

export default routes;
