import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { useInView } from 'react-intersection-observer';

import { ChatRoomDetail, Message as MessageType } from '../../types';

import { checkDifferentDate } from '../../utils/messagesUtils';
import formatDate from '../../utils/formatDate';

import Message from './Message';

interface MessagesProps {
  chatRoom: ChatRoomDetail;
  fetchChatRoom: (page: number) => void;
}

export default function Messages({
  chatRoom, fetchChatRoom,
} : MessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [ref, inView] = useInView();

  const reverseMessages = [...chatRoom.messages].reverse();

  const [messages, setMessages] = useState<MessageType[]>(reverseMessages);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    // setMessages();
    if (inView) {
      console.log();
    }
  }, [inView]);

  const showDate = (curDate: string, index: number) => {
    if (index && !checkDifferentDate(curDate, messages[index - 1].createdAt)) {
      return false;
    }
    return true;
  };

  return (
    <Container ref={scrollRef}>
      <div ref={ref} />
      {messages.map((message, index) => (
        <React.Fragment key={message.id}>
          {showDate(message.createdAt, index) && (
            <span>{formatDate(message.createdAt, { yearMonthDay: true })}</span>
          )}
          <Message
            prevMessage={messages[index - 1]}
            message={message}
            receiverId={chatRoom.receiverId}
            receiverImageUrl={chatRoom.receiverImageUrl}
          />
        </React.Fragment>
      ))}
    </Container>
  );
}

const Container = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;

  > span {
    display: inline-block;
    ${(props) => props.theme.texts.regular.small}
    margin-block: 1.2rem;
    padding: .6rem 1.6rem;
    border: 1px solid ${(props) => props.theme.colors.gray2.default};
    border-radius: 1.8rem;
    background-color: ${(props) => props.theme.colors.white.default};
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    > span {
      ${(props) => props.theme.texts.regular.hint}
      padding: .4rem 1.2rem;
    }
  }
`;
