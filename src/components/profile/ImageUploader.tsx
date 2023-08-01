import { useRef } from 'react';

import styled from 'styled-components';

import defaultProfileImage from '../../assets/image/default-profile-image.png';
import ImageUploaderPrompt from './ImageUploaderPrompt';

interface ImageUploaderProps {
  title?: string;
  imageUrl: string;
  onChangeFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DEFAULT_PROFILE_IMAGES = [
  'https://chatchat-bucket.s3.ap-northeast-2.amazonaws.com/default-profile-image.png',
  defaultProfileImage,
];

export default function ImageUploader({
  title = '',
  imageUrl,
  onChangeFileInput,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickImageBox = () => {
    inputRef.current?.click();
  };

  const handleKeyDownImageBox = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      inputRef.current?.click();
    }
  };

  return (
    <Container imageUrl={imageUrl}>
      <span id="file-input-label">{title}</span>
      <div
        role="button"
        aria-labelledby="file-input-label"
        tabIndex={0}
        onClick={handleClickImageBox}
        onKeyDown={handleKeyDownImageBox}
      >
        <label>
          <span>프로필 사진 변경</span>
          <input
            type="file"
            accept="image/*"
            onChange={onChangeFileInput}
            ref={inputRef}
          />
        </label>

        {DEFAULT_PROFILE_IMAGES.includes(imageUrl) ? (
          <ImageUploaderPrompt />
        ) : (
          <img src={imageUrl} alt="미리보기" />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div<{imageUrl: string}>`
  display: flex;

  span[id='file-input-label']{
    ${(props) => props.theme.texts.bold.subTitle};
      display: inline-block;
      min-width: 12rem;
      width: 12rem;
      height: 4.8rem;
      line-height: 4.8rem;
      margin-right: 2rem;
      padding-left: 0.8rem;
      text-align: left;
  }

  label {
    display: none;
  }

  div[role='button'] {
    ${(props) => props.theme.alignCenter.vertical}
    border: 1px dashed ${(props) => props.theme.colors.gray1.default};
    padding: 1.6rem;
    cursor: pointer;

    ${(props) => (DEFAULT_PROFILE_IMAGES.includes(props.imageUrl)) && `
      width: 100%;
      height: 12rem;
    `};

    img[alt='미리보기'] {
      display: block;
      max-width: 100%;
    }
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){   
    flex-direction: column;
    align-items: flex-start;

    span[id='file-input-label']{
      ${(props) => props.theme.texts.bold.boldText};
      min-width: auto;
      width: auto;
      height: auto;
      line-height: 1.5;
      margin-right: 0;
      margin-block: 0.6rem;
      padding-left: 0;  
    }

    div[role='button'] {
      padding: 1.2rem;
    }
  }
`;
