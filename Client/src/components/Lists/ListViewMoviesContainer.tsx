import { ReactNode } from "react";
import styled from "styled-components";

const StyledMoviesContainer = styled.div`
  border: 1px solid green;
`;

const ListViewMoviesContainer = ({ children }: { children: ReactNode }) => {
  return <StyledMoviesContainer>{children}</StyledMoviesContainer>;
};

export default ListViewMoviesContainer;
