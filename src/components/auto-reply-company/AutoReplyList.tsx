import styled from 'styled-components';

import useAutoReplyAdminQuery from '../../hooks/useAutoReplyAdminQuery';

import { AutoReply } from '../../types';

import AutoReplyRow from './AutoReplyRow';

export default function AutoReplyList() {
  const { isLoading, autoReplies, error } = useAutoReplyAdminQuery();

  // TODO : Error Page로 이동하기
  if (error) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  // TODO : 로딩화면 스켈레톤 적용
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (autoReplies.length === 0) {
    return <p>등록된 질문이 없습니다.</p>;
  }

  return (
    <Container>
      <ul>
        {autoReplies.map((autoReply: AutoReply) => (
          <AutoReplyRow
            key={autoReply.id}
            autoReply={autoReply}
          />
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`

`;
