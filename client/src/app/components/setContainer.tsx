import { styled } from "styled-components"

export const SetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 4rem;
  width: 20rem;
  padding: 0.5rem 1rem;
  background-color: var(--bg-secondary);
  border-radius: 1rem;
  transition: 0.5s all;

  &:hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
  
  &.selected{
    border: 2px solid var(--accent-hover);
    > p {
      color: var(--accent-hover);
    }
  }
`;
