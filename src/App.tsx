import {ThemeProvider} from 'styled-components';
import {Reset} from 'styled-reset';

import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/GlobalStyle';

import Button from './components/ui/Button';
import TextBox from './components/ui/TextBox';

export default function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Reset />
			<GlobalStyle />
		</ThemeProvider>
	);
}
