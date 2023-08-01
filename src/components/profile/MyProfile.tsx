import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import useLoginUserStore from '../../hooks/useLoginUserStore';

import profileEditIcon from '../../assets/image/icon/profile-edit-icon.png';
import autoReplyIcon from '../../assets/image/icon/auto-reply-edit-icon.png';

import ProfileBody from './ProfileBody';

export default function MyProfile() {
  const [{
    loading, userType, profile, error,
  }, store] = useLoginUserStore();

  useEffect(() => {
    store.fetchLoginUser(userType);
  }, []);

  // TODO : Error Page로 이동하기
  if (error) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  // TODO : 로딩화면 스켈레톤 적용
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <ProfileBody profile={profile} />

      <ul>
        <li>
          <Link to="edit">
            <div><img src={profileEditIcon} alt="" /></div>
            <span>프로필 편집</span>
          </Link>
        </li>
        {userType === 'company' && (
          <li>
            <Link to="/auto-reply">
              <div><img src={autoReplyIcon} alt="" /></div>
              <span>자동응답 관리</span>
            </Link>
          </li>
        )}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  ${(props) => props.theme.alignCenter.vertical}
  justify-content: start;
  overflow-y: scroll;

  ul {
    display: flex;
    padding-top: 6rem;

    li {
      margin-inline: 2.4rem;

      a {
        ${(props) => props.theme.alignCenter.vertical}
        
        div {
          ${(props) => props.theme.alignCenter.horizontal}
          width: 6rem;
          height: 6rem;
          background-color: ${(props) => props.theme.colors.gray2.default};
          border-radius: 50%;
          margin-bottom: 1.2rem;

          img {
            width: 3.2rem;
            height: 3.2rem;
          }
        }

        span {
          ${(props) => props.theme.texts.regular.medium}
        }
      }
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
    ul {
      padding-top: 3.8rem;

      li {
        margin-inline: 2rem;

        a {
          div {
            width: 4.8rem;
            height: 4.8rem;
            margin-bottom: .8rem;

            img {
              width: 2.4rem;
              height: 2.4rem;
            }
          }

          span {
            ${(props) => props.theme.texts.regular.small}
          }
        }
      }
    }
  }
`;
