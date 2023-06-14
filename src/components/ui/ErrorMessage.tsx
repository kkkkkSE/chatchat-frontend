import styled from 'styled-components';

type ErrorMessageProps = {
  children: string;
};
function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <StyledErrorMessage>
      {children}
    </StyledErrorMessage>
  );
}

export default ErrorMessage;

const StyledErrorMessage = styled.p`
    ${(props) => props.theme.texts.regular.small}
    color: ${(props) => props.theme.colors.accent.default};
    padding-block: 1.2rem;

    @media screen and (${(props) => props.theme.breakPoint.mobile}){
      ${(props) => props.theme.texts.regular.hint}
      padding-block: 1rem;
    }
`;
