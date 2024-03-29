import styled from "styled-components";

export const DefaultAnchor = styled.a<{ $color: string }>`
  color: ${(props) => props.$color};
  text-decoration: none;
  font-weight: bold;
  transition: all 300ms ease;

  &:hover {
    text-decoration: underline;
  }
`;
