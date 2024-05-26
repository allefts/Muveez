import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
// import { useState } from "react";

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .search_inpt {
    width: 350px;
    outline: none;
    border: 2px solid ${({ theme }) => theme.text};
    border-right: 0px;
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  .search_btn {
    outline: none;
    border: 2px solid ${({ theme }) => theme.text};
    border-left: 0px;
    border-radius: 0 1rem 1rem 0;
    padding: 0.6rem 1rem;
    background: ${({ theme }) => theme.text};
    cursor: pointer;

    transition: all 300ms ease;
    opacity: 0.8;

    svg {
      color: ${({ theme }) => theme.body};
      stroke-width: 0.5px;
    }

    &:hover {
      opacity: 1;
    }
  }
`;

const SearchBar = ({ placeholder = "Search..." }) => {
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchQuery(e.target.value);
  // };

  // const handleSearch = () => {
  //   if (onSearch) {
  //     onSearch(query);
  //   }
  // };

  return (
    <StyledSearchBar>
      <input
        className="search_inpt"
        type="text"
        // value={searchQuery}
        // onChange={handleChange}
        placeholder={placeholder}
      />
      <button
        style={{ display: "flex", alignItems: "center" }}
        className="search_btn"
      >
        <BsSearch size="1rem" />
      </button>
    </StyledSearchBar>
  );
};

export default SearchBar;
