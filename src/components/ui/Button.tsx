import styled from 'styled-components';

type ButtonProps = {
	type?: string;
	color?: 'accent' | 'gray';
	size?: 'fit';
};

const Button = styled.button.attrs<ButtonProps>(props => ({
	type: props.type ?? 'button',
	color: props.color,
	size: props.size,
}))<ButtonProps>`
  ${props => props.theme.texts.regular.medium};
  min-width : 14rem;
  height: 4.8rem;
  line-height: 4.8rem;
  margin-inline: .7rem;
  padding-inline: 2.0rem;
  border-radius: 2.4rem;
  font-size: 1.6rem;
  background-color: ${props => props.theme.colors.main.default};
  color: ${props => props.theme.colors.white.default};
  cursor: pointer;
  
  :hover{
    background-color: ${props => props.theme.colors.main.hover};
  }

  :disabled {
    background-color: ${props => props.theme.colors.gray2.default};
    color: ${props => props.theme.colors.gray1.default};
    cursor: not-allowed;
  }


  ${props => props.size === 'fit' && `
    min-width : auto;
  `}

  ${props => props.color === 'accent' && `
    background-color: ${props.theme.colors.accent.default};

    :hover {
      background-color: ${props.theme.colors.accent.hover};
    }
  `}

  ${props => props.color === 'gray' && `
    background-color: ${props.theme.colors.gray1.default};

    :hover {
      background-color: ${props.theme.colors.gray1.hover};
    }
  `}

  @media screen and (${props => props.theme.breakPoint.mobile}){
    min-width : 12rem;
    height: 3.6rem;
    line-height: 3.6rem;
    margin-inline: .5rem;
    border-radius: 2.0rem;
    ${props => props.theme.texts.regular.small};

    ${props => props.size === 'fit' && `
      min-width : auto;
    `}
  }
`;

export default Button;
