import { Link } from 'react-router-dom';

import styled from 'styled-components';

import backIcon from '../../assets/image/icon/back-icon.png';

interface NavigationBar {
  enableBack?: boolean;
  children: string;
}

function NavigationBar({
  enableBack = false,
  children,
}: NavigationBar) {
  return (
    <Container>
      {enableBack && (
        <Link to="/.."><img src={backIcon} alt="이전 페이지" /></Link>
      )}
      <h3>{children}</h3>
    </Container>
  );
}

export default NavigationBar;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white.default};
  width: 100%;
  display: flex;
  align-items: center;
  height: 6rem;
  padding-inline: 2rem;

  a{
    width: 2rem;
    height: 2rem;
    margin-right: 2rem;

    img{
      width: 100%;
      height: 100%;
    }
  }

  h3{
    ${(props) => props.theme.texts.bold.title}
    height: fit-content;
    margin-top: .1rem;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    height: 5.2rem;
    padding-inline: 1.6rem;

    a{
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 1.6rem;
    }

    h3{
      ${(props) => props.theme.texts.bold.subTitle}
    }
  }
`;
