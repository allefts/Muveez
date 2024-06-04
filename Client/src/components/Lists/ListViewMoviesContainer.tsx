import { ReactNode } from "react";
import styled from "styled-components";

const StyledMoviesContainer = styled.div`
  width: 100%;
  // display: flex;
  // flex-flow: row wrap;

  border-radius: 0.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const ListViewMoviesContainer = ({ children }: { children: ReactNode }) => {
  return <StyledMoviesContainer>{children}</StyledMoviesContainer>;
};

export default ListViewMoviesContainer;
