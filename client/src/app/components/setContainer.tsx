import { styled } from "styled-components"

export const SetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 4rem;
  flex-wrap: wrap;
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

  &>p,&>img {
    margin: 0.4rem;
  }

  &>img {
    width: 40px;
  }
`;
