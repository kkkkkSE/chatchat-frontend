/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';

import type Theme from './Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
