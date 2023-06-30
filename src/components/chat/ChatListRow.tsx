import styled from 'styled-components';

import { ChatRoomSummary } from '../../types';

import transformDate from '../../utils/transformDate';

interface ChatListRowProps {
  chatRoomSummary : ChatRoomSummary;
}

function ChatListRow({ chatRoomSummary }: ChatListRowProps) {
  const displayUnreadCount = (count: number) => {
    if (count > 999) return <span>+999</span>;
    if (count > 0) return <span>{count}</span>;
    return null;
  };

  return (
    <ChatListItem>
      <div>
        <img
          src={chatRoomSummary.receiverImageUrl}
          alt={chatRoomSummary.receiverName}
        />
      </div>
      <div>
        <div>
          <b>{chatRoomSummary.receiverName}</b>
          <p>{chatRoomSummary.lastMessage}</p>
        </div>
        <div>
          <small>{transformDate(chatRoomSummary.lastMessageDate)}</small>
          {displayUnreadCount(chatRoomSummary.unreadMessageCount)}
        </div>
      </div>
    </ChatListItem>
  );
}

const ChatListItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding-block: 1.4rem;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 10rem;
      height: 10rem;
      background-color: ${(props) => props.theme.colors.gray2.default};
      border-radius: 30%;
      margin-right: 2rem;
    }

    > div:nth-child(1){
      ${(props) => props.theme.alignCenter.vertical}
      align-items: flex-start;
      text-align: left;

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

  > div:nth-child(2){
    flex-grow: 1;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
    padding-block: 1rem;
    
    > div {
      img {
        width: 6.4rem;
        height: 6.4rem;
        object-fit: cover;
        margin-right: 1.4rem;
      }

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

export default ChatListRow;
