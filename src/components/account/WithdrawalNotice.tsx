import styled from 'styled-components';

import OperationButtons from '../ui/OperationButtons';

interface WithdrawalNoticeProps {
  setIsAgree : React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WithdrawalNotice({ setIsAgree } : WithdrawalNoticeProps) {
  const handleClickAgree = () => {
    setIsAgree(true);
  };

  return (
    <Container>
      <h3>계정 탈퇴 시 주의사항</h3>
      <p>
        계정 탈퇴 시 삭제되는 정보를 확인해주세요.
        <br />
        한 번 삭제된 정보는 복구할 수 없습니다.
      </p>
      <ul>
        <li>계정 및 프로필 정보 삭제</li>
        <li>채팅 내역 삭제</li>
      </ul>

      <OperationButtons
        primaryType="button"
        primaryName="동의하고 계속하기"
        primaryColor="accent"
        primaryOnClick={handleClickAgree}
      />
    </Container>
  );
}

const Container = styled.div`
  ${(props) => props.theme.alignCenter.vertical}
  justify-content: start;

  h3 {
    ${(props) => props.theme.texts.bold.subHeader}
    padding-block: 2.4rem;
  }

  p {
    ${(props) => props.theme.texts.regular.large}
    padding-bottom: 2rem;
  }

  ul {
    ${(props) => props.theme.texts.regular.small}
    width: 38rem;
    padding: 2rem 3.2rem;
    text-align: left;
    background-color: ${(props) => props.theme.colors.gray2.default};
    border-radius: 2rem;

    li {
      list-style: '- ';
    }
  }
`;
