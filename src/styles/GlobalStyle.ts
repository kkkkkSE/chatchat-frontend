import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/naming-convention
const GlobalStyle = createGlobalStyle`
  @font-face {
        font-family: 'Gmarket Sans';
        src: url('../assets/font/GmarketSansBold.woff2')
             url('../assets/font/GmarketSansBold.woff');
        font-weight: bold;
  }
  @font-face {
        font-family: 'Gmarket Sans';
        src: url('../assets/font/GmarketSansMedium.woff2')
             url('../assets/font/GmarketSansMedium.woff');
        font-weight: normal;
  }
  @font-face {
        font-family: 'Noto Sans KR';
        src: url('../assets/font/NotoSansKR-Bold.woff2')
             url('../assets/font/NotoSansKR-Bold.woff');
        font-weight: bold;
  }
  @font-face {
        font-family: 'Noto Sans KR';
        src: url('../assets/font/NotoSansKR-Regular.woff2')
             url('../assets/font/NotoSansKR-Regular.woff');
        font-weight: normal;
  }
  

  html {
      box-sizing: border-box;
  }
      
  *,
  *::before,
  *::after {
      box-sizing: inherit;
  }
      
  html {
      font-size: 62.5%;
  }
      
  body {
      font-family: 'Noto Sans KR';
      color: ${(props) => props.theme.colors.black.default};
      line-height: 1.5;
      ${(props) => props.theme.texts.regular.medium};
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    outline: none;
    border: none;
  }
`;

export default GlobalStyle;
