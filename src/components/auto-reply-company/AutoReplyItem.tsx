import styled from 'styled-components';

interface AutoReplyItemProps {
  question: string,
  answer: string
}

export default function AutoReplyItem({
  question, answer,
}: AutoReplyItemProps) {
  return (
    <Container>
      <div>
        <b>질문</b>
        <p>{question}</p>
      </div>
      <div>
        <b>답변</b>
        <p>{answer}</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  flex-grow: 1;

  div {
    display: flex;
    align-items: start;
    padding-block: .4rem;
    
    b {
      ${(props) => props.theme.texts.bold.subTitle};
      min-width: 8rem;
      height: 4.8rem;
      line-height: 4.8rem;
      margin-right: 2rem;
      padding-left: 0.8rem;
    }

    p {
      ${(props) => props.theme.texts.regular.medium};
      flex-grow: 1;
      padding-block: 1.2rem;
      white-space: pre-line;
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    div {
      flex-direction: column;
      align-items: start;
      
      b{
        ${(props) => props.theme.texts.bold.boldText};
        min-width: auto;
        height: auto;
        line-height: 1.5;
        margin-right: 0;
        margin-block: 0.4rem;
        padding-left: 0;
      }

      p {
        ${(props) => props.theme.texts.regular.small};
        padding-block: .8rem;
      }
    }
  }
`;
