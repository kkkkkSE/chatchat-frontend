import styled from 'styled-components';

import { Profile } from '../../types';

import ProfileImage from '../ui/ProfileImage';

interface ProfileBodyProps {
  profile: Profile;
}

export default function ProfileBody({
  profile,
}: ProfileBodyProps) {
  return (
    <Container>
      <div>
        <ProfileImage src={profile.imageUrl} alt={profile.name} />
      </div>
      <b>{profile.name}</b>
      {profile.description && (
        <pre>{profile.description}</pre>
      )}
    </Container>
  );
}

const Container = styled.div`
  ${(props) => props.theme.alignCenter.vertical};
  
  div {
    width: 15rem;
    height: 15rem;
    margin-block: 3rem;
  }

  b {
    ${(props) => props.theme.texts.bold.title}
  }

  pre {
    ${(props) => props.theme.texts.regular.large}
    max-width: 48rem;
    padding-top: 2rem;
    white-space: pre-line;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}) {
    > div:nth-child(1) {
      width: 10.8rem;
      height: 10.8rem;
      margin-block: 2rem;
    }

    b {
      ${(props) => props.theme.texts.bold.subTitle}
    }

    pre {
      ${(props) => props.theme.texts.regular.medium}
      max-width: 80%;
      padding-top: 1.6rem;
    }
  }
`;
