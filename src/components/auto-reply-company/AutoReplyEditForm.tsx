import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import useAutoReplyFormStore from '../../hooks/useAutoReplyFormStore';

import { QUERY_KEY } from '../../constants/reactQuery';
import { STATIC_ROUTES } from '../../constants/routes';

import TextBox from '../ui/TextBox';
import TextArea from '../ui/TextArea';
import OperationButtons from '../ui/OperationButtons';
import ErrorMessage from '../ui/ErrorMessage';

const MAX_LENGTH = {
  question: 60,
  answer: 150,
};

interface AutoReplyEditFormProps {
  id: number;
  question: string;
  answer: string;
}

export default function AutoReplyEditForm({
  id, question, answer,
}: AutoReplyEditFormProps) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [{ done, errorMessage }, store] = useAutoReplyFormStore();

  interface FormValues {
    question: string,
    answer: string,
  }

  const { control, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    store.reset();
  }, []);

  useEffect(() => {
    if (done) {
      store.reset();

      queryClient.invalidateQueries(QUERY_KEY.AUTO_REPLY_ADMIN_LIST);

      navigate(STATIC_ROUTES.AUTO_REPLIES);
    }
  }, [done]);

  const onSubmit = (data: FormValues) => {
    store.modifyAutoReply(id, data.question, data.answer.trim());
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="auto-reply-edit-form"
      >
        <Controller
          control={control}
          name="question"
          defaultValue={question}
          render={({ field: { value, onChange } }) => (
            <TextBox
              label="질문"
              value={value}
              onChange={onChange}
              maxLength={MAX_LENGTH.question}
              showLength
            />
          )}
        />

        <Controller
          control={control}
          name="answer"
          defaultValue={answer}
          render={({ field: { value, onChange } }) => (
            <TextArea
              label="답변"
              value={value}
              onChange={onChange}
              maxLength={MAX_LENGTH.answer}
              showLength
              fixHeight
            />
          )}
        />

        <OperationButtons
          primaryType="submit"
          primaryName="저장하기"
        />

        {errorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </form>
    </div>
  );
}
