import styled from 'styled-components';

import { Message } from '../../../types';

import formatDateWithOption from '../../../utils/date/formatDateWithOption';

interface SenderMessageProps {
  message: Message;
}

export default function SenderMessage({
  message,
}: SenderMessageProps) {
  return (
    <Container>
      <p>{message.content}</p>
      <span>{formatDateWithOption(message.createdAt, 'time')}</span>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  padding-block: .6rem;

  p {
    ${(props) => props.theme.texts.regular.medium}
    border-radius: 1rem;
    background-color: ${(props) => props.theme.colors.sub.default};
    padding: .8rem 1.2rem;
    margin-left: .8rem;
    text-align: left;
    white-space: pre-line;
  }

  span {
    ${(props) => props.theme.texts.regular.small}
    white-space: nowrap;
    color: ${(props) => props.theme.colors.gray1.default};
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    padding-block: .4rem;

    p {
      ${(props) => props.theme.texts.regular.small}
      padding: .6rem 1.0rem;
      margin-left: .6rem;
    }

    span {
      ${(props) => props.theme.texts.regular.hint}
    }
  }
`;
