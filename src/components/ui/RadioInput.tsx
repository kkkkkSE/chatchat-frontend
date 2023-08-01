import styled from 'styled-components';

interface RadioInputProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioInput({
  label, name, value, checked, onChange,
}: RadioInputProps) {
  return (
    <Container>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </Container>
  );
}

const Container = styled.label`
  margin-right: 2.4rem;
  display: flex;
  align-items: center;

  input[type="radio"] {
    position: relative;
    margin: 0 .8rem 0 0;
    vertical-align: middle;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: 1px solid ${(props) => props.theme.colors.gray1.default};
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
  }

  input[type="radio"]:checked::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.main.default};
  }

  span{
    ${(props) => props.theme.texts.regular.medium};
  }

  @media screen and (${(props) => props.theme.breakPoint.mobile}){   
    input[type="radio"] {
      margin: 0 .6rem 0 0;
      width: 1.4rem;
      height: 1.4rem;
    }

    input[type="radio"]:checked::before {
        width: .6rem;
        height: .6rem;
    }

    span{
      ${(props) => props.theme.texts.regular.small};
    }
  }
`;
