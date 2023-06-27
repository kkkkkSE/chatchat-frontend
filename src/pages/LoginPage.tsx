import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/login/LoginForm';

import useLoginFormStore from '../hooks/useLoginFormStore';

function LoginPage() {
  const [{ accessToken }, store] = useLoginFormStore();

  const navigate = useNavigate();

  useEffect(() => {
    store.reset();
  }, []);

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate('/chatrooms');
    }
  }, [accessToken]);

  const handleClickSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <LoginForm
      onClickMoveSignUp={handleClickSignUp}
    />
  );
}

export default LoginPage;
