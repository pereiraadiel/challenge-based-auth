import { styled } from "styled-components"

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 20rem;
  background-color: transparent;
  margin: 0.5rem 0;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 1rem;
  padding: 1.5rem 1rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
  /* text-transform: uppercase; */
  transition: 0.7s all;

  &.filled {
    border: none;
    background-color: var(--accent);
    color: var(--text-button);
  }
  
  &:hover {
    cursor: pointer;
    border: 1px solid var(--accent-hover);
    color: var(--accent-hover);

    &.filled {
      border: none;
      background-color: var(--accent-hover);
      color: var(--text-button);
    }
  }
`;

interface FilledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export const FilledButton: React.FC<FilledButtonProps> = ({...props}) => {
  return (
    <Button className="filled" {...props}/>
  )
}