import styled from 'styled-components';

import { Message } from '../../../types';

import formatDateWithOption from '../../../utils/date/formatDateWithOption';
import showProfileImage from '../../../utils/message/showProfileImage';

import ProfileImage from '../../ui/ProfileImage';

interface ReceiverMessageProps {
  message: Message;
  prevMessage: Message;
  imageUrl: string;
}

export default function ReceiverMessage({
  message, prevMessage, imageUrl,
}: ReceiverMessageProps) {
  const showProfileImageParams = {
    curSenderId: message.senderId,
    prevSenderId: prevMessage?.senderId,
    curDate: message.createdAt,
    prevDate: prevMessage?.createdAt,
  };

  return (
    <Container>
      <div>
        {showProfileImage(showProfileImageParams) && (
          <ProfileImage src={imageUrl} alt="프로필 정보" />
        )}
      </div>
      <div>
        <p>{message.content}</p>
        <span>{formatDateWithOption(message.createdAt, 'time')}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-block: .6rem;

  div:nth-child(1) {
    position: relative;
    min-width: 5rem;
    max-width: 5rem;
    border-radius: 30%;
    margin-right: 1.8rem;

    img {
      position: absolute;
      height: 5rem;
      top: 0;
      left: 0;
    }
  }

  div:nth-child(2) {
    display: flex;
    align-items: flex-end;

    p {
      ${(props) => props.theme.texts.regular.medium}
      border-radius: 1rem;
      background-color: ${(props) => props.theme.colors.gray2.default};
      padding: .8rem 1.2rem;
      margin-right: .8rem;
      text-align: left;
      white-space: pre-line;
    }

    span {
      ${(props) => props.theme.texts.regular.small}
      white-space: nowrap;
      color: ${(props) => props.theme.colors.gray1.default};
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    padding-block: .4rem;

    div:nth-child(1) {
      min-width: 4rem;
      max-width: 4rem;
      margin-right: 1.2rem;

      img {
        height: 4rem;
      }
    }

    div:nth-child(2) {
      p {
        ${(props) => props.theme.texts.regular.small}
        padding: .6rem 1.0rem;
        margin-right: .6rem;
      }

      span {
        ${(props) => props.theme.texts.regular.hint}
      }
    }
  }
`;
