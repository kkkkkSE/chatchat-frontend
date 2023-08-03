import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import backIcon from '../../assets/image/icon/back-icon.png';
import addIcon from '../../assets/image/icon/add-icon.png';
import searchIcon from '../../assets/image/icon/search-icon.png';

interface NavigationBar {
  enableBack?: boolean;
  actionButton?: 'add' | 'search';
  onClickActionButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

function NavigationBar({
  enableBack = false,
  actionButton = undefined,
  onClickActionButton = undefined,
  children,
}: NavigationBar) {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      {enableBack && (
        <button
          type="button"
          onClick={handleClickBack}
        >
          <img src={backIcon} alt="이전 페이지" />
        </button>
      )}
      <h3>{children}</h3>

      {actionButton && (
        <button
          type="button"
          onClick={onClickActionButton}
        >
          {actionButton === 'add' && <img src={addIcon} alt="추가" />}
          {actionButton === 'search' && <img src={searchIcon} alt="검색" />}
        </button>
      )}

    </Container>
  );
}

export default NavigationBar;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white.default};
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  line-height: 6rem;
  padding-inline: 2rem;

  button{
    width: 2rem;
    height: 2rem;

    img{
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }

  button:nth-child(1) {
    margin-right: 2rem;
  }

  button:not(:nth-child(1)) {
    margin-left: 2rem;
  }

  h3{
    ${(props) => props.theme.texts.bold.title}
    flex-grow: 1;
    height: fit-content;
    margin-top: .1rem;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    height: 5.2rem;
    line-height: 5.2rem;
    padding-inline: 1.6rem;

    button{
      width: 1.6rem;
      height: 1.6rem;
    }

    button:nth-child(1) {
      margin-right: 1.6rem;
    }

    button:not(:nth-child(1)) {
      margin-left: 1.6rem;
    }

    h3{
      ${(props) => props.theme.texts.bold.subTitle}
    }
  }
`;
