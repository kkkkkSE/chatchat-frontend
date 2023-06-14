import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import TextBox from '../components/ui/TextBox';

function LoginPage() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryString = location.search;

  const handleClickSignUp = () => {
    navigate(`/sign-up${queryString}`);
  };

  return (
    <div>
      <TextBox label="아이디" value="" />
      <TextBox label="비밀번호" value="" />
      <Button
        size="fit"
        color="gray"
        onClick={handleClickSignUp}
        marginTop
      >
        회원가입
      </Button>
      <Button marginTop>로그인</Button>
    </div>
  );
}

export default LoginPage;
