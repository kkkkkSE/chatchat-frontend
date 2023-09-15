import { useState } from 'react';

import ContentLayout from '../components/layout/ContentLayout';
import WithdrawalNotice from '../components/account/WithdrawalNotice';
import WithdrawalForm from '../components/account/WithdrawalForm';

export default function WithdrawalPage() {
  const [isAgree, setIsAgree] = useState(false);

  return (
    <ContentLayout
      enableBack
      pageHeader="계정 탈퇴"
      testId="withdrawal"
    >
      {!isAgree
        ? <WithdrawalNotice setIsAgree={setIsAgree} />
        : <WithdrawalForm />}
    </ContentLayout>
  );
}
