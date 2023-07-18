import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useAccessToken from '../../hooks/useAccessToken';
import useCheckLoginUser from '../../hooks/useCheckLoginUser';
import useLoginUserStore from '../../hooks/useLoginUserStore';

import Header from './Header';

export default function PostLoginLayout() {
  const navigate = useNavigate();

  const [{ userType }, store] = useLoginUserStore();

  const { accessToken } = useAccessToken();

  const { validUser } = useCheckLoginUser(userType);

  useEffect(() => {
    if (!accessToken) {
      store.reset();

      navigate('/');
    }
  }, [accessToken]);

  if (!validUser) {
    return null;
  }

  return (
    <Container>
      <Outlet />
      <Header />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  padding-left: 24rem;

  > div:nth-child(1){
    display: flex;
    flex-direction: column;
    width: 64rem;
    height: 100%;
    background-color: ${(props) => props.theme.colors.white.default};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.16);
    overflow: scroll;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    ${(props) => props.theme.alignCenter.vertical}
    height: 100vh;
    padding-left: 0;
    
    > div:nth-child(1){
      max-width: 64rem;
      width: 100%;
      box-shadow: none;
    }
  }
`;
