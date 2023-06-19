import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'reflect-metadata';

import { ThemeProvider } from 'styled-components';

import { Reset } from 'styled-reset';

import routes from './routes';

import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/GlobalStyle';

function main() {
  const container = document.getElementById('root');
  if (!container) {
    return;
  }

  const root = ReactDOM.createRoot(container);

  const router = createBrowserRouter(routes);

  root.render(
    <ThemeProvider theme={defaultTheme}>
      <Reset />
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}

main();
