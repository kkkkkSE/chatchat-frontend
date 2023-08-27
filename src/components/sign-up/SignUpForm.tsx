import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';

import styled from 'styled-components';

import useSignUpFormStore from '../../hooks/useSignUpFormStore';

import { STATIC_ROUTES } from '../../constants/routes';

import Button from '../ui/Button';
import TextBox from '../ui/TextBox';
import ErrorMessage from '../ui/ErrorMessage';

interface SignUpFormProps {
  userType: string;
}

export default function SignUpForm({ userType }: SignUpFormProps) {
  const navigate = useNavigate();

  const [{ errorMessage, done }, store] = useSignUpFormStore();

  interface FormValues {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  const { control, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    if (done) {
      store.reset();

      navigate(`${STATIC_ROUTES.LOGIN}?type=${userType}`);
    }
  }, [done]);

  const handleCheckSpace = (
    inputValue: string,
    onChange: (value: string) => void,
  ) => {
    const changeValue = inputValue.includes(' ')
      ? inputValue.replaceAll(' ', '')
      : inputValue;

    onChange(changeValue);
  };

  const onSubmit = (data: FormValues) => {
    store.signUp({
      type: userType,
      ...data,
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="sign-up-form">
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <TextBox
              label={userType === 'company' ? '기업명' : '이름'}
              value={value}
              onChange={onChange}
              placeholder="20자 이하"
              maxLength={20}
            />
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({ field: { value, onChange } }) => (
            <TextBox
              label="아이디"
              value={value}
              onChange={(inputValue) => handleCheckSpace(inputValue, onChange)}
              placeholder="6~20자 영문 또는 숫자 조합"
              maxLength={20}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <TextBox
              type="password"
              label="비밀번호"
              value={value}
              onChange={(inputValue) => handleCheckSpace(inputValue, onChange)}
              placeholder="8~40자 영문, 숫자 포함"
              maxLength={40}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <TextBox
              type="password"
              label="비밀번호 확인"
              value={value}
              onChange={(inputValue) => handleCheckSpace(inputValue, onChange)}
              maxLength={40}
            />
          )}
        />

        <Button marginTop type="submit">
          가입하기
        </Button>
      </form>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  input::placeholder{
    color:black;
  }
`;
