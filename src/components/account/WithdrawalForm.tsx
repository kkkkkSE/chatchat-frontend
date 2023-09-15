import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';

import useLoginUserStore from '../../hooks/useLoginUserStore';
import useWithdrawalFormStore from '../../hooks/useWithdrawalFormStore';

import { STATIC_ROUTES } from '../../constants/routes';

import TextBox from '../ui/TextBox';
import OperationButtons from '../ui/OperationButtons';
import ErrorMessage from '../ui/ErrorMessage';

export default function WithdrawalForm() {
  const navigate = useNavigate();

  const [{ userType }] = useLoginUserStore();

  const [{ errorMessage, done }, store] = useWithdrawalFormStore();

  interface FormValues {
    password: string;
  }

  const { control, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    store.reset();
  }, []);

  useEffect(() => {
    if (done) {
      navigate(`${STATIC_ROUTES.LOGIN}?type=${userType}`);
    }
  }, [done]);

  const onSubmit = async ({ password } : FormValues) => {
    store.withdrawal({
      type: userType,
      password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="withdrawal-form"
    >
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <TextBox
            type="password"
            label="비밀번호 입력"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <OperationButtons
        primaryType="submit"
        primaryName="탈퇴하기"
        primaryColor="accent"
      />

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
