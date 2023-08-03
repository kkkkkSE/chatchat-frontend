import styled from 'styled-components';

import NavigationBar from '../ui/NavigationBar';

interface ContentLayoutProps {
  enableBack?: boolean;
  actionButton?: 'add' | 'search';
  onClickActionButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  pageHeader: string;
  children: React.ReactNode;
  testId?: string;
}

export default function ContentLayout({
  enableBack = false,
  actionButton = undefined,
  onClickActionButton = undefined,
  pageHeader,
  children,
  testId = undefined,
}: ContentLayoutProps) {
  return (
    <Container data-testid={testId}>
      <NavigationBar
        enableBack={enableBack}
        actionButton={actionButton}
        onClickActionButton={onClickActionButton}
      >
        {pageHeader}
      </NavigationBar>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  > :nth-child(2){
    height: calc(100vh - 6rem);
    overflow-y: scroll;
    padding: 0 2rem 2rem;
  }

  > p:nth-child(2) {
      ${(props) => props.theme.texts.regular.medium}
      padding-block: 6rem;
      text-align: center;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
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
