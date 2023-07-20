import styled from 'styled-components';

import formatDateWithOption from '../../../utils/date/formatDateWithOption';

interface ChatDateProps {
  curDate: string;
}

export default function ChatDate({
  curDate,
} : ChatDateProps) {
  return (
    <Container>
      <span>{formatDateWithOption(curDate, 'yearMonthDay')}</span>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;

  span {
    display: inline-block;
    ${(props) => props.theme.texts.regular.small}
    margin-block: 1.2rem;
    padding: .6rem 1.6rem;
    border: 1px solid ${(props) => props.theme.colors.gray2.default};
    border-radius: 1.8rem;
    background-color: ${(props) => props.theme.colors.white.default};
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    span {
      ${(props) => props.theme.texts.regular.hint}
      padding: .4rem 1.2rem;
    }
  }
`;
