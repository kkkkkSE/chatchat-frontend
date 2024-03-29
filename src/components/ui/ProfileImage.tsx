import styled from 'styled-components';

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.gray2.default};
  border-radius: 30%;
  object-fit: cover;
  border: 1px solid ${(props) => props.theme.colors.gray2.default};
`;

export default ProfileImage;
