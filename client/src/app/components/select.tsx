import { styled } from "styled-components"

export const Select = styled.select`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 20rem;
  background-color: transparent;
  border: 1px solid var(--text-primary);
  border-radius: 1rem;
  padding: 1.2rem 1rem;
  font-family: inherit;
  font-size: 1rem; 

  > option {
    padding: 1rem;
    margin: 1rem 0;
    background-color: var(--bg-secondary);
    border: none;

    &:focus, &:active, &::selection {
      background-color: var(--bg-primary);
    }
  }
`;

const SelectContainer = styled.div`
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

interface LabledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}


export const LabledSelect: React.FC<LabledSelectProps> = ({label, ...props}) => {
  return (
    <SelectContainer>
      <Label>{label}</Label>
      <Select className="filled" {...props}/>
    </SelectContainer>
  )
}