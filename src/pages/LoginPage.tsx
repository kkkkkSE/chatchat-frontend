import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import LoginForm from '../components/login/LoginForm';

import useLoginFormStore from '../hooks/useLoginFormStore';
import useLoginUserStore from '../hooks/useLoginUserStore';

function LoginPage() {
  const navigate = useNavigate();

  const [{ accessToken }, loginFormStore] = useLoginFormStore();

  const [, loginUserStore] = useLoginUserStore();

  const [params] = useSearchParams();

  const userType = params.get('type') || '';

  useEffect(() => {
    loginFormStore.reset();

    const validUserTypes = ['company', 'customer'];

    if (!validUserTypes.includes(userType)) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      loginFormStore.reset();

      localStorage.setItem('userType', userType);

      loginUserStore.setUserType(userType);

      navigate('/chatrooms');
    }
  }, [accessToken]);

  const handleClickSignUp = () => {
    navigate(`/sign-up?type=${userType}`);
  };

  return (
    <LoginForm
      userType={userType}
      handleClickSignUp={handleClickSignUp}
    />
  );
}

export default LoginPage;
