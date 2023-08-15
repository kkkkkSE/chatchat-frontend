/* eslint-disable no-param-reassign */
import React, { forwardRef, useCallback, useState } from 'react';

import styled from 'styled-components';

// TODO : 기본 height(size)를 선택할 수 있도록 변경하기
interface TextAreaProps {
  value: string;
  label?: string;
  placeholder?: string;
  fixHeight?: boolean;
  maxLength?: number;
  showLength?: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  value, label, placeholder, fixHeight, maxLength, showLength, onKeyPress, onChange,
}, ref) => {
  const [textLength, setTextLength] = useState(0);

  const handleResizeHeight = useCallback(() => {
    if (fixHeight) return;
    if (typeof ref === 'object' && ref?.current) {
      const height = ref.current.scrollHeight;

      if (height < 150) {
        ref.current.style.height = '0';
        ref.current.style.height = `${ref.current.scrollHeight * 0.1}rem`;
      }
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;

    if (maxLength && inputValue.length > maxLength) {
      return;
    }

    setTextLength(inputValue.length);

    handleResizeHeight();

    onChange?.(event);
  };

  return (
    <Container fixHeight={fixHeight}>
      <label>
        {label && <span>{label}</span>}
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          ref={ref}
        />
      </label>
      {showLength && (
        <span>
          {textLength}
          {' '}
          /
          {' '}
          {maxLength}
        </span>
      )}
    </Container>
  );
});

TextArea.displayName = 'TextArea';

TextArea.defaultProps = {
  label: undefined,
  placeholder: undefined,
  fixHeight: false,
  onKeyPress: undefined,
  maxLength: undefined,
  showLength: false,
};

export default TextArea;

const Container = styled.div<{ fixHeight?: boolean }>`
  display: flex;  
  flex-direction: column;
  align-items: end;
  padding-block: .7rem;
  flex-grow: 1;

  label {
    width: 100%;
    display: flex;

    span {
      ${(props) => props.theme.texts.bold.subTitle};
      display: inline-block;
      width: 12rem;
      height: 4.8rem;
      line-height: 4.8rem;
      margin-right: 2rem;
      padding-left: 0.8rem;
      text-align: left;
    }

    textarea {
      display: block;
      ${(props) => props.theme.texts.regular.medium};
      flex-grow: 1;
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
  }

  > span {
    ${(props) => props.theme.texts.regular.small};
    ${(props) => props.theme.colors.gray1.default};
    padding-top: .2rem;
  }

  ${(props) => props.fixHeight && `
    label {
      textarea {
        min-height: 12rem;
        height: 12rem;
      }
    }
  `}

  @media screen and (${(props) => props.theme.breakPoint.mobile}){   
    padding-block: .6rem;

    label { 
      flex-direction: column;

      span{
        ${(props) => props.theme.texts.bold.boldText};
        width: auto;
        height: auto;
        line-height: 1.5;
        margin-right: 0;
        margin-block: 0.6rem;
        padding-left: 0;  
      }

      textarea {
        ${(props) => props.theme.texts.regular.small};
        min-height: 4rem;
        height: 4rem;
        padding: .8rem 1.2rem;
      }
    }

    > span {
      ${(props) => props.theme.texts.regular.hint};
    }

    ${(props) => props.fixHeight && `
      label {
        textarea {
          min-height: 12rem;
          height: 12rem;
        }
      }

      @media screen and (${props.theme.breakPoint.mobile}){    
        label {
          textarea {
            min-height: 7rem;
            height: 7rem;
          }
        }
      }   
    `}
  }
`;
