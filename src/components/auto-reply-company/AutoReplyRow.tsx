import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import styled from 'styled-components';

import { AutoReply } from '../../types';

import { apiService } from '../../services/ApiService';

import { QUERY_KEY } from '../../constants/reactQuery';
import { DYNAMIC_ROUTES } from '../../constants/routes';

import AutoReplyItem from './AutoReplyItem';
import AutoReplyButtons from './AutoReplyButtons';

interface AutoReplyRowProps {
  autoReply: AutoReply;
}

export default function AutoReplyRow({
  autoReply,
}: AutoReplyRowProps) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(DYNAMIC_ROUTES.AUTO_REPLIY_EDIT(autoReply.id));
  };

  // TODO : 삭제 체크를 위한 모달 추가
  const handleClickDelete = async () => {
    await apiService.deleteAutoReply({ id: autoReply.id });

    queryClient.invalidateQueries(QUERY_KEY.AUTO_REPLY_ADMIN_LIST);
  };

  return (
    <Container>
      <AutoReplyItem
        question={autoReply.question}
        answer={autoReply.answer}
      />
      <AutoReplyButtons
        onClickEdit={handleClickEdit}
        onClickDelete={handleClickDelete}
      />
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray2.default};
  
  &:last-child {
    border-bottom: none;
  }
`;
