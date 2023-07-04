import styled from 'styled-components';
import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

import autoReplyIcon from '../../assets/image/icon/auto-reply-icon.png';

interface MessageInputProps {
  chatRoomId: number;
  receiverId: number;
}

export default function MessageInput({
  chatRoomId, receiverId,
}: MessageInputProps) {
  return (
    <Container>
      <button type="button">
        <img src={autoReplyIcon} alt="FAQ" />
      </button>
      <TextBox label="" value="" placeholder="메세지 입력" />
      <Button size="fit">전송</Button>
    </Container>
  );
}

const Container = styled.div`
  ${(props) => props.theme.alignCenter.horizontal}
  width: calc(100% + 4rem);
  margin-left: -2rem;
  margin-bottom: -2rem;
  padding: .4rem 2rem;
  background-color: ${(props) => props.theme.colors.white.default};
  border-top: 1px solid ${(props) => props.theme.colors.gray2.default};

  button:nth-child(1){
    width: 4.8rem;
    margin-right: .4rem;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){
    width: calc(100% + 3.2rem);
    margin-left: -1.6rem;
    margin-bottom: -1.6rem;
    padding: .2rem 1.2rem;
    bottom: 6rem;

    button:nth-child(1){
      width: 3.6rem;
    }
  }
`;
