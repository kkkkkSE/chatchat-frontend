import { Controller, useForm } from 'react-hook-form';

import useLoginUserStore from '../../hooks/useLoginUserStore';
import usePasswordChangeFormStore from '../../hooks/usePasswordChangeFormStore';

import OperationButtons from '../ui/OperationButtons';
import ErrorMessage from '../ui/ErrorMessage';

import TextBox from '../ui/TextBox';

export default function PasswordChangeForm() {
  const [{ userType }] = useLoginUserStore();

  const [{ errorMessage }, store] = usePasswordChangeFormStore();

  interface FormValues {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  }

  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    store.changePassword({
      type: userType,
      ...data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="password-change-form"
    >
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <TextBox
            type="password"
            label="기존 비밀번호"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field: { value, onChange } }) => (
          <TextBox
            type="password"
            label="새 비밀번호"
            placeholder="8~40자 영문, 숫자 포함"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmNewPassword"
        render={({ field: { value, onChange } }) => (
          <TextBox
            type="password"
            label="비밀번호 확인"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <OperationButtons
        primaryName="변경하기"
        primaryType="submit"
      />

      {errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </form>
  );
}
