import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import backIcon from '../../assets/image/icon/back-icon.png';

interface NavigationBar {
  enableBack?: boolean;
  children: React.ReactNode;
}

function NavigationBar({
  enableBack = false,
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
    </Container>
  );
}

export default NavigationBar;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white.default};
  width: 100%;
  display: flex;
  align-items: center;
  height: 6rem;
  line-height: 6rem;

  button{
    width: 2rem;
    height: 2rem;
    margin-right: 2rem;

    img{
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }

  h3{
    ${(props) => props.theme.texts.bold.title}
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
      margin-right: 1.6rem;
    }

    h3{
      ${(props) => props.theme.texts.bold.subTitle}
    }
  }
`;
