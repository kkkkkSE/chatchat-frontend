import { useSearchParams } from 'react-router-dom';

import Button from '../components/ui/Button';
import TextBox from '../components/ui/TextBox';

function SignUpPage() {
  const [searchParams] = useSearchParams();

  const userType = searchParams.get('type');

  return (
    <div>
      <TextBox label={userType === 'company' ? '기업명' : '이름'} value="" />
      <TextBox label="아이디" value="" />
      <TextBox label="비밀번호" value="" />
      <TextBox label="비밀번호 확인" value="" />
      <Button marginTop>가입하기</Button>
    </div>
  );
}

export default SignUpPage;
