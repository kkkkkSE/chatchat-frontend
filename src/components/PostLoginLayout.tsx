import { Outlet, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useCheckAccessToken from '../hooks/useCheckAccessToken';

import checkUserType from '../utils/checkUserType';

import Header from './Header';

export default function PostLoginLayout() {
  const navigate = useNavigate();

  const validUserType = checkUserType();

  const ready = useCheckAccessToken();

  if (!validUserType) {
    navigate('/');
  }

  if (!ready) {
    return null;
  }

  return (
    <Container>
      <Header />
      <div className="body">
        <div className="contents">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;

  .body {
    ${(props) => props.theme.alignCenter.horizontal}
    flex-grow: 1;
    height: 100%;
    
    .contents{
      width: 64rem;
      height: 100%;
      background-color: ${(props) => props.theme.colors.white.default};
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.16);
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    .body {
      .contents{
        max-width: 64rem;
        width: 100%;
        box-shadow: none;
        padding-bottom: 6rem;
      }
    }    
  }
`;
