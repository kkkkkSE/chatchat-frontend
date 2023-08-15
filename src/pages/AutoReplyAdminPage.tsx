import { useNavigate } from 'react-router-dom';

import AutoReplyList from '../components/auto-reply-company/AutoReplyList';
import ContentLayout from '../components/layout/ContentLayout';

import { STATIC_ROUTES } from '../constants/routes';

function AutoReplyAdminPage() {
  const navigate = useNavigate();

  // TODO : 등록 최대 개수 초과 시 안내 모달창 띄우기
  const handleClickAdd = () => {
    navigate(STATIC_ROUTES.AUTO_REPLIES_NEW);
  };

  return (
    <ContentLayout
      pageHeader="자동응답 관리"
      testId="auto-reply-list"
      actionButton="add"
      onClickActionButton={handleClickAdd}
    >
      <AutoReplyList />
    </ContentLayout>
  );
}

export default AutoReplyAdminPage;
