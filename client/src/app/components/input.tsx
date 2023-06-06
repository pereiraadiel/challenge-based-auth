import { styled } from "styled-components"

export const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 20rem;
  background-color: transparent;
  border: 2px solid var(--text-primary);
  border-radius: 1rem;
  padding: 1.5rem 1rem;
  font-family: inherit;
  font-size: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  margin: 1rem 0;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

interface LabledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const LabledInput: React.FC<LabledInputProps> = ({label, ...props}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input {...props}/>
    </InputContainer>
  )
}