import styled from 'styled-components';

import { Profile } from '../../types';

import ProfileBody from './ProfileBody';

import inquiryIcon from '../../assets/image/icon/inquiry-icon.png';

interface OpenProfileProps {
  openProfile: Profile;
  onClickInquiry: () => void;
}

export default function OpenProfile({
  openProfile, onClickInquiry,
}: OpenProfileProps) {
  return (
    <Container>
      <ProfileBody profile={openProfile} />

      <ul>
        <li>
          <button
            type="button"
            onClick={onClickInquiry}
          >
            <div><img src={inquiryIcon} alt="" /></div>
            <span>문의하기</span>
          </button>
        </li>
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

      button {
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

        button {
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
