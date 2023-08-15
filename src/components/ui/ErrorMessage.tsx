import styled from 'styled-components';

type ErrorMessageProps = {
  children: React.ReactNode;
};
function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default ErrorMessage;

const Container = styled.p`
    ${(props) => props.theme.texts.regular.small}
    color: ${(props) => props.theme.colors.accent.default};
    padding-block: 1.2rem;
    text-align: center;

    @media screen and (${(props) => props.theme.breakPoint.mobile}){
      ${(props) => props.theme.texts.regular.hint}
      padding-block: 1rem;
    }
`;
