import { useEffect } from 'react';

import useLoginUserStore from '../hooks/useLoginUserStore';

import ContentLayout from '../components/layout/ContentLayout';
import OpenProfileList from '../components/profile/OpenProfileList';

export default function OpenProfileListPage() {
  const [{ userType }] = useLoginUserStore();

  useEffect(() => {
    if (userType !== 'customer') {
      // TODO : Error Page로 이동하기
    }
  }, []);

  return (
    <ContentLayout
      pageHeader="오픈 프로필 목록"
      testId="open-profile-list"
    >
      <OpenProfileList />
    </ContentLayout>
  );
}
