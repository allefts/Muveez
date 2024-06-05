import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { SetURLSearchParams } from "react-router-dom";

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;

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

type SearchBarProps = {
  searchValue: string;
  setSearchValue: SetURLSearchParams;
};

const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {
  return (
    <StyledSearchBar>
      <input
        className="search_inpt"
        type="text"
        value={searchValue}
        onChange={(e) =>
          setSearchValue((prev) => {
            prev.set("q", e.target.value);
            return prev;
          })
        }
        placeholder="Bee Movie"
        autoFocus
      />
      <button
        style={{ display: "flex", alignItems: "center" }}
        className="search_btn"
      >
        <BsSearch size={15.5} />
      </button>
    </StyledSearchBar>
  );
};

export default SearchBar;
