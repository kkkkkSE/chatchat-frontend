import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import ContentLayout from '../components/layout/ContentLayout';
import ProfileEditForm from '../components/profile/ProfileEditForm';

import { STATIC_ROUTES } from '../constants/routes';

import useProfileEditStore from '../hooks/useProfileEditStore';

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const [{ done }, store] = useProfileEditStore();

  useEffect(() => {
    if (done) {
      store.reset();

      navigate(STATIC_ROUTES.MY_PROFILE);
    }

    return () => {
      store.reset();
    };
  }, [done]);

  return (
    <ContentLayout
      enableBack
      pageHeader="내 프로필 편집"
      testId="my-profile-edit"
    >
      <ProfileEditForm />
    </ContentLayout>
  );
}
