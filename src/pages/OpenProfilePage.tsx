import { useParams } from 'react-router-dom';

import useOpenProfileQuery from '../hooks/useOpenProfileQuery';

import ContentLayout from '../components/layout/ContentLayout';
import OpenProfile from '../components/profile/OpenProfile';

export default function OpenProfilePage() {
  const params = useParams();
  const id = Number(params.id);

  // TODO : id 없을 때 not found 페이지 이동
  if (!id) {
    return (
      <div>
        <p>Not Found</p>
      </div>
    );
  }

  const { isLoading, openProfile, error } = useOpenProfileQuery(id);

  // TODO : Error Page로 이동하기
  if (error) {
    return (
      <div>
        <p>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const handleClickInquiry = () => {
    // ...
  };

  return (
    <ContentLayout
      pageHeader={openProfile.name}
      testId="open-profile"
      enableBack
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <OpenProfile
          openProfile={openProfile}
          onClickInquiry={handleClickInquiry}
        />
      )}
    </ContentLayout>
  );
}
