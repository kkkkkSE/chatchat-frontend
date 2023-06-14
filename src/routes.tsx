import PreLoginLayout from './components/PreLoginLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const routes = [
	{element: <PreLoginLayout />, children: [
		{path: '/', element: <HomePage />},
		{path: '/login', element: <LoginPage />},
		{path: '/sign-up', element: <SignUpPage />},
	]},
];

export default routes;
