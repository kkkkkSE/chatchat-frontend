import styled from 'styled-components';

import { ChatRoomSummary } from '../../types';

import formatDateAuto from '../../utils/date/formatDateAuto';

import ProfileImage from '../ui/ProfileImage';

interface ChatListRowProps {
  chatRoom : ChatRoomSummary;
  handleClickChatRoom : (id: number) => void;
}

export default function ChatListRow({
  chatRoom, handleClickChatRoom,
}: ChatListRowProps) {
  const displayUnreadCount = (count: number) => {
    if (count > 999) return <span>+999</span>;
    if (count > 0) return <span>{count}</span>;
    return null;
  };

  return (
    <Container onClick={() => handleClickChatRoom(chatRoom.id)}>
      <div>
        <ProfileImage
          src={chatRoom.receiverImageUrl}
          alt={chatRoom.receiverName}
        />
      </div>
      <div>
        <div>
          <b>{chatRoom.receiverName}</b>
          <p>{chatRoom.lastMessage}</p>
        </div>
        <div>
          <small>{formatDateAuto(chatRoom.lastMessageDate)}</small>
          {displayUnreadCount(chatRoom.unreadMessageCount)}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding-block: 1.4rem;
  cursor: pointer;

  > div:nth-child(1) {
    min-width: 10rem;
    max-width: 10rem;
    height: 10rem;
    margin-right: 2rem;
  }
  
  > div:nth-child(2) {
    display: flex;
    align-items: center;
    flex-grow: 1;

    > div:nth-child(1){
      ${(props) => props.theme.alignCenter.vertical}
      align-items: flex-start;
      text-align: left;
      flex-grow: 1;

      b {
        ${(props) => props.theme.texts.bold.title}
      }

      p {
        ${(props) => props.theme.texts.regular.medium}
        color: ${(props) => props.theme.colors.gray1.default};
        margin-top: .4rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    > div:nth-child(2){
      ${(props) => props.theme.alignCenter.vertical}
      align-items: flex-end;
      justify-content: space-between;

      min-width: 12rem;
      height: 6.2rem;
      text-align: right;

      small {
        ${(props) => props.theme.texts.regular.small}
        color: ${(props) => props.theme.colors.gray1.default};
      }

      span {
        display: block;
        ${(props) => props.theme.texts.regular.small}
        color: ${(props) => props.theme.colors.white.default};
        background-color: ${(props) => props.theme.colors.accent.default};
        height: 2.2rem;
        line-height: 2.4rem;
        padding-inline: .8rem;
        border-radius: 1.2rem;
      }
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
    padding-block: 1rem;
    
    > div:nth-child(1) {
      min-width: 6.4rem;
      max-width: 6.4rem;
      height: 6.4rem;
      margin-right: 1.4rem;
    }

    > div:nth-child(2){
      > div:nth-child(1){
        b {
          ${(props) => props.theme.texts.bold.boldText}
        }

        p {
          ${(props) => props.theme.texts.regular.small}
        }
      }

      > div:nth-child(2){
        min-width: 9.5rem;
        height: 4.8rem;

        small {
          ${(props) => props.theme.texts.regular.hint}
        }

        span {
          ${(props) => props.theme.texts.regular.hint}
          height: 1.8rem;
          line-height: 2rem;
          padding-inline: .6rem;
        }
      }
    }
  }
`;
