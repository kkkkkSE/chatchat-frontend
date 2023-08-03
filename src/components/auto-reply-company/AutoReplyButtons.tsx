import styled from 'styled-components';

import editIcon from '../../assets/image/icon/edit-icon.png';
import deleteIcon from '../../assets/image/icon/delete-icon.png';

interface AutoReplyButtonsProps {
  onClickEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AutoReplyButtons({
  onClickEdit, onClickDelete,
}: AutoReplyButtonsProps) {
  return (
    <Container>
      <button
        type="button"
        onClick={onClickEdit}
      >
        <img src={editIcon} alt="편집" />
      </button>
      <button
        type="button"
        onClick={onClickDelete}
      >
        <img src={deleteIcon} alt="삭제" />
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding-left: 1.2rem;

  button {
    ${(props) => props.theme.alignCenter.horizontal}      
    width: 4.2rem;
    height: 4.2rem;
    margin: 1.2rem .8rem;
    border-radius: 50%;
    
    :nth-child(1) {
      background-color: ${(props) => props.theme.colors.gray2.default};
    }

    :nth-child(2) {
      background-color: ${(props) => props.theme.colors.accent.default};
      margin-right: 0;
    }

    img {
      width: 2.2rem;
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    padding-left: .8rem;

    button {
      width: 3.2rem;
      height: 3.2rem;
      margin: .8rem .5rem;
      
      img {
        width: 1.6rem;
      }
    }
  }
`;
