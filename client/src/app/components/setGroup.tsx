import { styled } from "styled-components"

export const SetGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1.25rem;
  width: 100%;
  max-width: 62.5rem;
  max-height: 50vh;
  overflow-y: scroll;
  place-items: center;
  margin: 1rem 0.5rem;

  @media (min-width: 1000px) {
    overflow-y: auto;
    max-height: none;
  }
`;
