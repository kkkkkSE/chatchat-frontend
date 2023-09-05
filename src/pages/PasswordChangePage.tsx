import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import usePasswordChangeFormStore from '../hooks/usePasswordChangeFormStore';

import { STATIC_ROUTES } from '../constants/routes';

import ContentLayout from '../components/layout/ContentLayout';
import PasswordChangeForm from '../components/account/PasswordChangeForm';

export default function PasswordChangePage() {
  const navigate = useNavigate();

  const [{ done }, store] = usePasswordChangeFormStore();

  useEffect(() => {
    store.reset();
  }, []);

  useEffect(() => {
    if (done) {
      store.reset();

      navigate(STATIC_ROUTES.ACCOUNT);
    }
  }, [done]);

  return (
    <ContentLayout
      pageHeader="비밀번호 변경"
      testId="password-change"
    >
      <PasswordChangeForm />
    </ContentLayout>
  );
}
