import React, { useEffect } from 'react';
import useAccessToken from '../../hooks/useAccessToken';
import useLoginFormStore from '../../hooks/useLoginFormStore';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import TextBox from '../ui/TextBox';

interface LoginForm {
  onClickMoveSignUp: () => void;
}

export default function LoginForm({
  onClickMoveSignUp,
}: LoginForm) {
  const { setAccessToken } = useAccessToken();

  const [{
    username, password, errorMessage, accessToken,
  }, store] = useLoginFormStore();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  const handleChangeUsername = (value: string) => {
    store.changeUsername(value);
  };

  const handleChangePassword = (value: string) => {
    store.changePassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.login();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextBox
          label="아이디"
          value={username}
          onChange={handleChangeUsername}
        />
        <TextBox
          label="비밀번호"
          value={password}
          type="password"
          onChange={handleChangePassword}
        />
        <Button
          size="fit"
          color="gray"
          onClick={onClickMoveSignUp}
          marginTop
        >
          회원가입
        </Button>
        <Button
          marginTop
          type="submit"
        >
          로그인
        </Button>
        {errorMessage.length > 0 && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </form>
    </div>
  );
}
