import styled from "styled-components";
import SearchInput from "./SearchInput";
// import { useState } from "react";

const StyledSearchMovies = styled.div``;

const SearchMoviesInput = () => {
  // const [searchValue, setSearchValue] = useState("");

  return (
    <StyledSearchMovies>
      <SearchInput placeholder="Movies" />
      <div></div>
    </StyledSearchMovies>
  );
};

export default SearchMoviesInput;
