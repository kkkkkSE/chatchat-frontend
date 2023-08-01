/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEvent, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import useProfileEditStore from '../../hooks/useProfileEditStore';
import useLoginUserStore from '../../hooks/useLoginUserStore';

import TextBox from '../ui/TextBox';
import TextArea from '../ui/TextArea';
import RadioInputContainer from '../ui/RadioInputContainer';
import RadioInput from '../ui/RadioInput';
import OperationButtons from '../ui/OperationButtons';
import ErrorMessage from '../ui/ErrorMessage';

import ImageUploader from './ImageUploader';

export default function ProfileEditForm() {
  const [previewImage, setPreviewImage] = useState('');

  const [{
    loading, userType, profile, error,
  }] = useLoginUserStore();

  const [{ errorMessage }, store] = useProfileEditStore();

  const {
    name, description, profileVisibility, imageUrl,
  } = profile;

  interface FormValues {
    name: string,
    description: string,
    profileVisibility: string
  }

  const { control, handleSubmit } = useForm<FormValues>();

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files[0]) {
      const image = event.target.files[0];

      store.setNewImage(image);

      setPreviewImage(URL.createObjectURL(image));
    }
  };

  const onSubmit = async (data : FormValues) => {
    const visibility = data.profileVisibility
      ? JSON.parse(data.profileVisibility)
      : undefined;

    store.updateProfile({
      type: userType,
      name: data.name,
      description: data?.description,
      imageUrl,
      profileVisibility: visibility,
    });
  };

  // TODO : error 페이지 이동
  if (error) {
    return <p>Error!</p>;
  }

  // TODO : 로딩화면 스켈레톤 적용
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="profile-edit-form"
      >
        <Controller
          control={control}
          name="name"
          defaultValue={name}
          render={({ field: { value, onChange } }) => (
            <TextBox
              label={userType === 'company' ? '기업명' : '이름'}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {userType === 'company' && (
          <>
            <Controller
              control={control}
              name="description"
              defaultValue={description}
              render={({ field: { value, onChange } }) => (
                <TextArea
                  label="소개글"
                  value={value}
                  onChange={onChange}
                  fixHeight
                />
              )}
            />

            <Controller
              control={control}
              name="profileVisibility"
              defaultValue={JSON.stringify(profileVisibility)}
              render={({ field }) => (
                <RadioInputContainer
                  title="공개 여부"
                  {...field}
                >
                  <RadioInput
                    label="오픈 프로필 공개"
                    name="profileVisibility"
                    value="true"
                    checked={field.value === 'true'}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                  <RadioInput
                    label="오픈 프로필 숨김"
                    name="profileVisibility"
                    value="false"
                    checked={field.value === 'false'}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                </RadioInputContainer>
              )}
            />
          </>
        )}

        <ImageUploader
          title="프로필 사진"
          imageUrl={
            previewImage === ''
              ? imageUrl
              : previewImage
          }
          onChangeFileInput={handleChangeImage}
        />

        <OperationButtons
          primaryName="저장하기"
          primaryType="submit"
        />
      </form>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
