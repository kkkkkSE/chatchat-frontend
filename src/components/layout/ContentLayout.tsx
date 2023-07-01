import styled from 'styled-components';
import NavigationBar from '../ui/NavigationBar';

interface ContentLayoutProps {
  enableBack?: boolean;
  page: string;
  children: React.ReactNode;
}

export default function ContentLayout({
  enableBack = false,
  page,
  children,
}: ContentLayoutProps) {
  return (
    <Container>
      <NavigationBar enableBack={enableBack}>{page}</NavigationBar>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  > :nth-child(1){
    padding-inline: 2rem;
  }

  > :nth-child(2){
    flex-grow: 1;
    padding: 0 2rem 2rem;
  }

  > p {
      ${(props) => props.theme.texts.regular.medium}
      padding-block: 6rem;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
    > :nth-child(1){
      padding-inline: 1.6rem;
    }

    > :nth-child(2){
      flex-grow: 1;
      padding: 0 1.6rem 1.6rem;
    }

    > p {
        ${(props) => props.theme.texts.regular.medium}
        padding-block: 5rem;
    }
  }
`;
