import React, { useState } from 'react';

import styled from 'styled-components';

type TextBoxProps = {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  value: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  maxLength?: number;
  showLength?: boolean;
};

export default function TextBox({
  label = undefined,
  placeholder = undefined,
  type = 'text',
  value,
  onChange = undefined,
  onKeyDown = undefined,
  readOnly = false,
  maxLength = undefined,
  showLength = false,
}: TextBoxProps) {
  const [textLength, setTextLength] = useState(value?.length || 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (maxLength && inputValue.length > maxLength) {
      return;
    }

    setTextLength(inputValue.length);

    onChange?.(inputValue);
  };

  return (
    <Container>
      <label>
        {label && <span>{label}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          readOnly={readOnly}
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
}

const Container = styled.div`
  display: flex;  
  flex-direction: column;
  align-items: end;
  padding-block: 0.7rem;
  
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

    input {
      ${(props) => props.theme.texts.regular.medium};
      flex-grow: 1;
      height: 4.8rem;
      border-radius: .5rem;
      border: 1px solid ${(props) => props.theme.colors.gray1.default};
      padding: 1.2rem 1.6rem;

      ::placeholder {
        color: ${(props) => props.theme.colors.gray1.default};
      }

      :focus {
        border: 2px solid ${(props) => props.theme.colors.main.default};
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

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    padding-block: 0.6rem;

    label{
      flex-direction: column;

      span {
        ${(props) => props.theme.texts.bold.boldText};
        width: auto;
        height: auto;
        line-height: 1.5;
        margin-right: 0;
        margin-block: 0.6rem;
        padding-left: 0;
      }

      input{
        ${(props) => props.theme.texts.regular.small};
        width: 100%;
        height: 4rem;
        padding: .8rem 1.2rem;
      }
    } 

    > span {
      ${(props) => props.theme.texts.regular.hint};
    }
  }
`;
