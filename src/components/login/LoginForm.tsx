import React, { useEffect } from 'react';

import styled from 'styled-components';

import useAccessToken from '../../hooks/useAccessToken';
import useLoginFormStore from '../../hooks/useLoginFormStore';

import Button from '../ui/Button';
import TextBox from '../ui/TextBox';
import ErrorMessage from '../ui/ErrorMessage';

interface LoginFormProps {
  userType: string;
  handleClickSignUp : () => void;
}

export default function LoginForm({
  userType, handleClickSignUp,
} : LoginFormProps) {
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
    store.login(userType);
  };

  return (
    <Container>
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
          onClick={handleClickSignUp}
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
