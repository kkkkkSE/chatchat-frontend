import { Link } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useFetchMyProfile from '../../hooks/useFetchMyProfile';

import ProfileImage from '../ui/ProfileImage';

import profileEditIcon from '../../assets/image/icon/profile-edit-icon.png';
import autoReplyIcon from '../../assets/image/icon/auto-reply-edit-icon.png';

export default function MyProfile() {
  const [userType] = useLocalStorage('userType', '');

  const { isLoading, profile } = useFetchMyProfile();

  // TODO : 로딩화면 스켈레톤 적용
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div>
        <ProfileImage src={profile.imageUrl} alt={profile.name} />
      </div>
      <b>{profile.name}</b>
      {profile.description && (
        <pre>{profile.description}</pre>
      )}
      <ul>
        <li>
          <Link to="/edit">
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

  > div:nth-child(1) {
    width: 15rem;
    height: 15rem;
    margin-block: 3rem;
  }

  b {
    ${(props) => props.theme.texts.bold.title}
  }

  pre {
    ${(props) => props.theme.texts.regular.large}
    max-width: 48rem;
    padding-top: 2rem;
    white-space: pre-line;
  }

  ul {
    display: flex;
    padding-top: 6rem;

    li {
      width: 12rem;

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
    > div:nth-child(1) {
      width: 10.8rem;
      height: 10.8rem;
      margin-block: 2rem;
    }

    b {
      ${(props) => props.theme.texts.bold.subTitle}
    }

    pre {
      ${(props) => props.theme.texts.regular.medium}
      max-width: 80%;
      padding-top: 1.6rem;
    }

    ul {
      padding-top: 3.8rem;

      li {
        width: 9.6rem;

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
