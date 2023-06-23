import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import useLoginFormStore from '../hooks/useLoginFormStore';

function LoginPage() {
  const [{ accessToken }, store] = useLoginFormStore();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    if (type === null) {
      navigate('/');
    } else {
      store.reset();
      store.setType(type);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate(`/chatrooms?type=${type}`);
    }
  }, [accessToken]);

  const handleClickSignUp = () => {
    navigate(`/sign-up?type=${type}`);
  };

  return (
    <LoginForm
      onClickMoveSignUp={handleClickSignUp}
    />
  );
}

export default LoginPage;
