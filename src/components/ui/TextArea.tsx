/* eslint-disable no-param-reassign */
import React, { forwardRef, useCallback } from 'react';

import styled from 'styled-components';

interface TextareaProps {
  value: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  value, placeholder, maxLength, onKeyPress, onChange,
}, ref) => {
  const handleResizeHeight = useCallback(() => {
    if (typeof ref === 'object' && ref?.current) {
      const height = ref.current.scrollHeight;

      if (height < 150) {
        ref.current.style.height = '0';
        ref.current.style.height = `${ref.current.scrollHeight * 0.1}rem`;
      }
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleResizeHeight();

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Container>
      <textarea
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        ref={ref}
      />
    </Container>
  );
});

TextArea.displayName = 'TextArea';

TextArea.defaultProps = {
  placeholder: undefined,
  onKeyPress: undefined,
  maxLength: undefined,
};

export default TextArea;

const Container = styled.div`
  line-height: 1;
  flex-grow: 1;

  textarea {
    display: block;
    ${(props) => props.theme.texts.regular.medium};
    width: 100%;
    min-height: 4.8rem;
    height: 4.8rem;
    line-height: 2.4rem;
    border-radius: .5rem;
    padding: 1.2rem 1.6rem;
    border: 1px solid ${(props) => props.theme.colors.gray1.default};
    resize: none;

    ::placeholder {
      color: ${(props) => props.theme.colors.gray1.default};
    }

    :focus {
      border: 1px solid ${(props) => props.theme.colors.main.default};
    }

    :disabled {
      border: 1px solid ${(props) => props.theme.colors.gray1.default};
      color: ${(props) => props.theme.colors.gray1.default};
      background-color: ${(props) => props.theme.colors.gray2.default};
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){    
    textarea {
      ${(props) => props.theme.texts.regular.small};
      min-height: 4rem;
      height: 4rem;
      padding: .8rem 1.2rem;
    }
  }
`;
