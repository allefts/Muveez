import { ReactNode } from "react";
import styled from "styled-components";

const StyledMoviesContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 240px));
  grid-template-rows: 400px;
  gap: 5rem;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const ListViewMoviesContainer = ({ children }: { children: ReactNode }) => {
  return <StyledMoviesContainer>{children}</StyledMoviesContainer>;
};

export default ListViewMoviesContainer;
