import React, { useRef } from 'react';

import { Controller, useForm } from 'react-hook-form';

import styled from 'styled-components';

import useSockJS from '../../../hooks/useSockJS';

import Button from '../../ui/Button';
import Textarea from '../../ui/TextArea';

import autoReplyIcon from '../../../assets/image/icon/auto-reply-icon.png';

interface MessageInputProps {
  chatRoomId: number;
}

export default function MessageInput({
  chatRoomId,
}: MessageInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { sendMessage } = useSockJS(chatRoomId);

  const { control, handleSubmit, reset } = useForm<{content:string}>();

  const MAX_LENGTH = 1999;

  const resetTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0';
    }
  };

  const onSubmit = ({ content } : {content: string}) => {
    sendMessage(content);

    reset({ content: '' });
    resetTextAreaHeight();
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Container>
      <button type="button">
        <img src={autoReplyIcon} alt="FAQ" />
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="message-form"
      >
        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => (
            <Textarea
              value={value}
              onChange={onChange}
              placeholder="메세지 입력"
              maxLength={MAX_LENGTH}
              onKeyPress={handleKeyPress}
              ref={textAreaRef}
            />
          )}
        />
        <Button
          size="fit"
          type="submit"
        >
          전송
        </Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  ${(props) => props.theme.alignCenter.horizontal}
  align-items: center;
  width: calc(100% + 4rem);
  margin-bottom: -2rem;
  padding: .4rem 2rem;
  background-color: ${(props) => props.theme.colors.white.default};
  border-top: 1px solid ${(props) => props.theme.colors.gray2.default};

  button:nth-child(1){
    width: 4.8rem;
    margin-right: .4rem;
  }

  form {
    ${(props) => props.theme.alignCenter.horizontal}
    align-items: center;
    flex-grow: 1;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    width: calc(100% + 3.2rem);
    margin-bottom: -1.6rem;
    padding: .2rem 1.2rem;
    bottom: 6rem;

    button:nth-child(1){
      width: 3.6rem;
    }
  }
`;
