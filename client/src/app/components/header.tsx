import { styled } from "styled-components"

const TagHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 6rem;
  width: 100%;
  font-family: inherit;

  > h1 {
    font-size: 2.5rem;
    font-weight: 600;
  }
`;

export const Header: React.FC = () => {
  return (
    <TagHeader>
      <h1>Challenge Based Authentication</h1>
    </TagHeader>
  )
}