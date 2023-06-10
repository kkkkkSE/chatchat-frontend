import type React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  margin-block: 0.7rem;

  label {
    width: 100%;

    span {
      ${props => props.theme.texts.bold.subTitle};
      display: inline-block;
      width: 12rem;
      height: 4.8rem;
      line-height: 4.8rem;
      margin-right: 2rem;
      padding-left: 0.8rem;
    }

    input {
      ${props => props.theme.texts.regular.medium};
      width: calc(100% - 14rem);
      height: 4.8rem;
      border-radius: .5rem;
      border: 1px solid ${props => props.theme.colors.gray1.default};
      padding: 1.2rem 1.6rem;

      ::placeholder {
        color: ${props => props.theme.colors.gray1.default};
      }

      :focus {
        border: 2px solid ${props => props.theme.colors.main.default};
      }

      :disabled {
        border: 1px solid ${props => props.theme.colors.gray1.default};
        color: ${props => props.theme.colors.gray1.default};
        background-color: ${props => props.theme.colors.gray2.default};
      }
    }
  }

  @media screen and (max-width: 768px){
    margin-block: 0.6rem;
    label{
      span {
        ${props => props.theme.texts.bold.boldText};
        width: auto;
        height: auto;
        line-height: auto;
        margin-right: 0;
        padding-left: 0;
      }

      input{
        ${props => props.theme.texts.regular.small};
        width: 100%;
        height: 3.6rem;
        padding: .8rem 1.2rem;
      }
    } 
  }
`;

type TextBoxProps = {
	label: string;
	placeholder?: string;
	type?: 'text' | 'password';
	value: string;
	onChange?: (value: string) => void;
	readOnly?: boolean;
};

export default function TextBox({
	label,
	placeholder = undefined,
	type = 'text',
	value,
	onChange = undefined,
	readOnly = false,
}: TextBoxProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) {
			return;
		}

		onChange(event.target.value);
	};

	return (
		<Container>
			<label>
				<span>{label}</span>
				<input
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					readOnly={readOnly}
				/>
			</label>
		</Container>
	);
}
