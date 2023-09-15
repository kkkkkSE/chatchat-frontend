import { Link } from 'react-router-dom';

import styled from 'styled-components';

import ContentLayout from '../components/layout/ContentLayout';

import { STATIC_ROUTES } from '../constants/routes';

import passwordIcon from '../assets/image/icon/password-icon.png';
import withdrawalIcon from '../assets/image/icon/withdrawal-icon.png';

export default function AccountPage() {
  return (
    <ContentLayout
      pageHeader="계정 관리"
      testId="account-management"
    >
      <ContainerList>
        <li>
          <Link to={STATIC_ROUTES.CHANGE_PASSWORD}>
            <img src={passwordIcon} alt="" />
            <span>비밀번호 변경</span>
          </Link>
        </li>
        <li>
          <Link to={STATIC_ROUTES.DELETE_ACCOUNT}>
            <img src={withdrawalIcon} alt="" />
            <span>계정 탈퇴</span>
          </Link>
        </li>
      </ContainerList>
    </ContentLayout>
  );
}

const ContainerList = styled.ul`
  li {
    padding: 1rem 1.4rem;
    margin-bottom: .4rem;
    border-radius: 1rem;
    cursor: pointer;

    :hover {
      background-color: ${(props) => props.theme.colors.gray2.default};
    }

    > a {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      width: 100%;
    }

    img {
      width: 3rem;
      margin-right: 2rem;
    }

    span {
      ${(props) => props.theme.texts.bold.subTitle}
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    li {
      padding: 1rem 1.2rem;

      img {
        width: 2.6rem;
        margin-right: 1.4rem;
      }

      span {
        ${(props) => props.theme.texts.bold.boldText}
      }
    }
  }
`;
