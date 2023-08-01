import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Button from './Button';

interface OperationButtonsProps {
  primaryName: string;
  primaryType: 'button' | 'submit' | 'reset';
  primaryColor?: 'accent' | 'gray';
  primaryOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function OperationButtons({
  primaryName,
  primaryType,
  primaryColor = undefined,
  primaryOnClick = undefined,
}: OperationButtonsProps) {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Button
        size="fit"
        color="gray"
        marginTop
        onClick={handleClickBack}
      >
        취소
      </Button>
      <Button
        type={primaryType}
        marginTop
        color={primaryColor}
        onClick={primaryOnClick}
      >
        {primaryName}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
