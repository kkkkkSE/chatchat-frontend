import styled from 'styled-components';
import { Message } from '../../types';

import { checkDifferentDate, checkDifferentSender, checkReceiver } from '../../utils/messagesUtils';
import formatDate from '../../utils/formatDate';

import ProfileImage from '../ui/ProfileImage';

interface MessageProps {
  prevMessage: Message;
  message: Message;
  receiverId: number;
  receiverImageUrl: string;
}

export default function Message({
  prevMessage, message,
  receiverId, receiverImageUrl,
}: MessageProps) {
  const showProfileImage = (curDate: string, curSenderId: number) => {
    const isReceiver = checkReceiver(curSenderId, receiverId);

    if (!prevMessage) return isReceiver;

    return isReceiver && (
      checkDifferentSender(curSenderId, prevMessage.senderId)
      || checkDifferentDate(curDate, prevMessage.createdAt)
    );
  };

  return (
    <Container
      className={
        checkReceiver(message.senderId, receiverId)
          ? 'receiver' : 'sender'
      }
    >
      <div>
        {showProfileImage(message.createdAt, message.senderId) && (
          <ProfileImage
            src={receiverImageUrl}
            alt="상대 프로필"
          />
        )}
      </div>
      <div>
        <p>{message.content}</p>
        <span>{formatDate(message.createdAt, { time: true })}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-block: .8rem;

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
    }

    span {
      ${(props) => props.theme.texts.regular.small}
      color: ${(props) => props.theme.colors.gray1.default};
    }
  }

  &.sender {
    justify-content: flex-end;

    div:nth-child(2) {
      flex-direction: row-reverse;

      p {
        background-color: ${(props) => props.theme.colors.sub.default};
        margin-right: 0;
        margin-left: .8rem;
      }
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    padding-block: .6rem;

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

    &.sender {
      div:nth-child(2) {
        p {
          margin-left: .6rem;
        }
      }
    }
  }
`;
