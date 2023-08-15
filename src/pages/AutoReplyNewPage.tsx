import AutoReplyAddForm from '../components/auto-reply-company/AutoReplyAddForm';
import ContentLayout from '../components/layout/ContentLayout';

export default function AutoReplyNewPage() {
  return (
    <ContentLayout
      pageHeader="자동응답 추가"
      testId="auto-reply-new"
      enableBack
    >
      <AutoReplyAddForm />
    </ContentLayout>
  );
}
