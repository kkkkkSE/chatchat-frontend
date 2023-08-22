import { useNavigate, useParams } from 'react-router-dom';

import useOpenProfileQuery from '../hooks/useOpenProfileQuery';

import { apiService } from '../services/ApiService';

import { DYNAMIC_ROUTES } from '../constants/routes';

import ContentLayout from '../components/layout/ContentLayout';
import OpenProfile from '../components/profile/OpenProfile';

export default function OpenProfilePage() {
  const navigate = useNavigate();

  const params = useParams();
  const companyId = Number(params.id);

  // TODO : id 없을 때 not found 페이지 이동
  if (!companyId) {
    return (
      <div>
        <p>Not Found</p>
      </div>
    );
  }

  const { isLoading, openProfile, error } = useOpenProfileQuery(companyId);

  // TODO : Error Page로 이동하기
  if (error) {
    return (
      <div>
        <p>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const handleClickInquiry = async () => {
    try {
      const chatRoomId = await apiService.createChatRoom({
        companyId,
      });

      navigate(DYNAMIC_ROUTES.CHATROOM(chatRoomId));
    } catch (e) {
      // TODO : Error Page로 이동하기
    }
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
