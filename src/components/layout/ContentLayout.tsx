import styled from 'styled-components';
import NavigationBar from '../ui/NavigationBar';

interface ContentLayoutProps {
  enableBack?: boolean;
  page: string;
  children: React.ReactNode;
  testId?: string;
}

export default function ContentLayout({
  enableBack = false,
  page,
  children,
  testId = undefined,
}: ContentLayoutProps) {
  return (
    <Container data-testid={testId}>
      <NavigationBar enableBack={enableBack}>{page}</NavigationBar>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  > :nth-child(1){
    padding-inline: 2rem;
  }

  > :nth-child(2){
    height: calc(100vh - 6rem);
    padding: 0 2rem 2rem;
  }

  > p:nth-child(2) {
      ${(props) => props.theme.texts.regular.medium}
      padding-block: 6rem;
      text-align: center;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
    
    > :nth-child(1){
      padding-inline: 1.6rem;
    }
    
    > :nth-child(2){
      height: calc(100vh - 11.2rem);
      padding: 0 1.6rem 1.6rem;
    }

    > p:nth-child(2) {
        ${(props) => props.theme.texts.regular.small}
        padding-block: 5rem;
    }
  }
`;
