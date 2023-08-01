import styled from 'styled-components';
import attachIcon from '../../assets/image/icon/attach-icon.png';

export default function ImageUploaderPrompt() {
  return (
    <Container>
      <img src={attachIcon} alt="이미지 첨부하기" />
      <span>클릭하여 업로드</span>
    </Container>
  );
}

const Container = styled.div`
  ${(props) => props.theme.alignCenter.vertical}

  img[alt='이미지 첨부하기'] {
    width: 4rem;
  }

  span {
    ${(props) => props.theme.texts.regular.small}
    color: ${(props) => props.theme.colors.gray1.default};
    font-family: 'Gmarket Sans';
    padding-top: 1.5rem;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){   
    span {
      padding-top: 1.2rem;
    }
  }
`;
