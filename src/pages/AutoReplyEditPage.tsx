import { useParams } from 'react-router-dom';

import ContentLayout from '../components/layout/ContentLayout';
import AutoReplyEditForm from '../components/auto-reply-company/AutoReplyEditForm';

import useAutoReplyAdminQuery from '../hooks/useAutoReplyAdminQuery';

import findAutoReply from '../utils/auto-reply/findAutoReply';

export default function AutoReplyEditPage() {
  const { isLoading, autoReplies, error } = useAutoReplyAdminQuery();

  const params = useParams();
  const id = Number(params.id);

  const autoReply = findAutoReply(autoReplies, id);

  // TODO : error 페이지 이동
  if (error) {
    return <p>Error!</p>;
  }

  return (
    <ContentLayout
      pageHeader="자동응답 편집"
      testId="auto-reply-edit"
      enableBack
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AutoReplyEditForm
          id={id}
          question={autoReply.question}
          answer={autoReply.answer}
        />
      )}
    </ContentLayout>
  );
}
