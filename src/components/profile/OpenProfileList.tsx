import { useNavigate } from 'react-router-dom';
import { DYNAMIC_ROUTES } from '../../constants/routes';

import useOpenProfileInfiniteQuery from '../../hooks/useOpenProfileInfiniteQuery';

import { Profile } from '../../types';

import OpenProfileListRow from './OpenProfileListRow';

export default function OpenProfileList() {
  const navigate = useNavigate();

  const {
    ref, isLoading, data, error,
  } = useOpenProfileInfiniteQuery();

  // TODO : Error Page로 이동하기
  if (error) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  // TODO : 로딩화면 스켈레톤 적용
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { pages } = data;

  if (pages[0].companySummaries.length === 0) {
    return <p>등록된 오픈 프로필이 없습니다.</p>;
  }

  const handleClickProfile = (id: number) => {
    navigate(DYNAMIC_ROUTES.OPEN_PROFILE(id));
  };

  return (
    <div>
      <ul>
        {pages.map((page) => page.companySummaries.map((openProfile : Profile) => (
          <OpenProfileListRow
            key={openProfile.id}
            openProfile={openProfile}
            handleClickProfile={handleClickProfile}
          />
        )))}
      </ul>
      <div ref={ref} />
    </div>
  );
}
