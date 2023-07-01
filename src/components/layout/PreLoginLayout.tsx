import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import checkUserType from '../../utils/checkUserType';

function PreLoginLayout() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const validUserType = checkUserType();

  useEffect(() => {
    if (pathname !== '/' && !validUserType) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container>
      <div className="wrapper">
        <h1>CHATCHAT</h1>
        <Outlet />
      </div>
    </Container>
  );
}

export default PreLoginLayout;

const Container = styled.div`
  ${(props) => props.theme.alignCenter.horizontal};
  height: 100vh;

  .wrapper{
    width: 64rem;
    ${(props) => props.theme.alignCenter.vertical};

    h1{
      ${(props) => props.theme.texts.bold.header}
      font-family: 'Gmarket Sans';
      margin-bottom: 5rem;
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    width: 100%;
    padding-inline: 1.6rem;

    .wrapper{

    h1{
      ${(props) => props.theme.texts.bold.subHeader}
      margin-bottom: 3.2rem;
    }
  }
  }
`;
