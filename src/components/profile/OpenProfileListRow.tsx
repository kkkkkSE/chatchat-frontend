import styled from 'styled-components';

import { Profile } from '../../types';

import ProfileImage from '../ui/ProfileImage';

interface OpenProfileListRowProps {
  openProfile: Profile;
  handleClickProfile : (id: number) => void;
}

export default function OpenProfileListRow({
  openProfile, handleClickProfile,
}: OpenProfileListRowProps) {
  return (
    <Container onClick={() => handleClickProfile(openProfile.id)}>
      <div>
        <ProfileImage src={openProfile.imageUrl} />
      </div>
      <div>
        <b>{openProfile.name}</b>
        <p>{openProfile.description}</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-block: 1.4rem;
  cursor: pointer;
  
  > div:nth-child(1){
    min-width: 10rem;
    max-width: 10rem;
    height: 10rem;
    margin-right: 2rem;
  }

  > div:nth-child(2){
    flex-grow: 1;

    b {
      ${(props) => props.theme.texts.bold.title}
    }

    p {
      ${(props) => props.theme.texts.regular.medium}
      color: ${(props) => props.theme.colors.gray1.default};
      margin-top: .4rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
    padding-block: 1rem;
    
    > div:nth-child(1) {
      min-width: 6.4rem;
      max-width: 6.4rem;
      height: 6.4rem;
      margin-right: 1.4rem;
    }

    > div:nth-child(2){
      b {
        ${(props) => props.theme.texts.bold.boldText}
      }

      p {
        ${(props) => props.theme.texts.regular.small}
      }
    }
  }
`;
