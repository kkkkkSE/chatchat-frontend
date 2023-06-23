import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

import profileIcon from '../assets/image/icon/profile-icon.png';
import profileListIcon from '../assets/image/icon/profile-list-icon.png';
import chatListIcon from '../assets/image/icon/chat-list-icon.png';
import accountIcon from '../assets/image/icon/account-icon.png';
import logoutIcon from '../assets/image/icon/logout-icon.png';

export default function Header() {
  return (
    <Container>
      <h2>CHATCHAT</h2>
      <div className="navWrap">
        <nav>
          <NavLink to="/profile">
            <img src={profileIcon} alt="" />
            <span>내 프로필</span>
          </NavLink>
          <NavLink to="/companies">
            <img src={profileListIcon} alt="" />
            <span>오픈 프로필 목록</span>
          </NavLink>
          <NavLink to="/chatrooms">
            <img src={chatListIcon} alt="" />
            <span>채팅 목록</span>
          </NavLink>
        </nav>

        <nav>
          <NavLink to="/account">
            <img src={accountIcon} alt="" />
            <span>계정 관리</span>
          </NavLink>
          <NavLink to="/">
            <img src={logoutIcon} alt="" />
            <span>로그아웃</span>
          </NavLink>
        </nav>
      </div>
    </Container>
  );
}

const Container = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: 100vh;
  padding: 12px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.16);
  background-color: ${(props) => props.theme.colors.white.default};

  h2 {
    padding-block: 3.6rem;
    text-align: center;
    font-family: 'Gmarket Sans';
    ${(props) => props.theme.texts.bold.header}
  }

  .navWrap {
    flex-grow: 1;
    ${(props) => props.theme.alignCenter.vertical}
    justify-content: space-between;
  }

  a {
    padding: 1.2rem;
    display: flex;
    border-radius: 1rem;
    
    img{
      height: 2.4rem;
      margin-right: 1.6rem;
    }

    span{
      ${(props) => props.theme.texts.bold.boldText}
      line-height: 2.4rem;
    }
  }

  a.active{
    background-color: ${(props) => props.theme.colors.gray2.default};
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6rem;
    background-color: ${((props) => props.theme.colors.gray2.default)};
    box-shadow: none;
    display: flex;
    justify-content: space-around;

    h2 {
      display: none;
    }

    .navWrap {
      flex-direction: row;
      justify-content: center;
    }

    nav:nth-child(1) { flex-grow : 3 };
    nav:nth-child(2) { flex-grow : 2 };

    nav{
      display: flex;
      justify-content: space-around;

      a {
        padding: 0.8rem;
        justify-content: center;
        align-content: center;
        
        img{
          margin: 0;
        }

        span{
          display: none;
        }
      }
    }

    a.active{
      background-color: ${(props) => props.theme.colors.black.default};

      img{
        filter: brightness(100);
      }
    }
}

`;
