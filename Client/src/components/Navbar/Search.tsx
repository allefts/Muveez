import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;

  .search_inpt {
    flex-grow: 1;
    max-width: 550px;
    font-size: 1.25rem;
    outline: none;
    border: 2px solid ${({ theme }) => theme.text};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
`;

type SearchBarProps = {
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ setSearchValue }: SearchBarProps) => {
  return (
    <StyledSearchBar>
      <input
        className="search_inpt"
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Bee Movie"
        autoFocus
      />
    </StyledSearchBar>
  );
};

export default SearchBar;
