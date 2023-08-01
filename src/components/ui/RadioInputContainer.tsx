import { forwardRef } from 'react';

import styled from 'styled-components';

interface RadioInputContainerProps {
  title?: string;
  children: React.ReactNode;
}

const RadioInputContainer = forwardRef<HTMLDivElement, RadioInputContainerProps>(({
  title, children,
}, ref) => (
  <Container>
    {title && (
      <span id="radiogroup-label">{title}</span>
    )}
    <div
      role="radiogroup"
      aria-labelledby="radiogroup-label"
      ref={ref}
    >
      {children}
    </div>
  </Container>
));

RadioInputContainer.displayName = 'RadioInputContainer';

RadioInputContainer.defaultProps = {
  title: '',
};

export default RadioInputContainer;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-block: .7rem;

  span[id='radiogroup-label'] {
    ${(props) => props.theme.texts.bold.subTitle};
    display: inline-block;
    width: 12rem;
    height: 4.8rem;
    line-height: 4.8rem;
    margin-right: 2rem;
    padding-left: 0.8rem;
    text-align: left; 
  }

  div[role='radiogroup'] {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){   
    padding-block: .6rem;
    flex-direction: column;
    align-items: flex-start;

    span[id='radiogroup-label'] {
      ${(props) => props.theme.texts.bold.boldText};
      width: auto;
      height: auto;
      line-height: 1.5;
      margin-right: 0;
      margin-block: 0.6rem;
      padding-left: 0;  
    }

    div[role='radiogroup'] {
      padding-block: .8rem;
    }
  }
`;
