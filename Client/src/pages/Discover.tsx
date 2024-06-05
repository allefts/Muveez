import styled from "styled-components";
import SearchBar from "../components/Navbar/Search";
import { useDebounce } from "../utils/hooks/useDebounce";
import SearchList from "../components/Discover/SearchList";
import { useSearchParams } from "react-router-dom";

const StyledDiscoverPage = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
`;

const DiscoverPage = () => {
  const [searchValue, setSearchValue] = useSearchParams({ q: " " });
  const q = searchValue.get("q");
  const debouncedSearchValue = useDebounce(q!);

  return (
    <StyledDiscoverPage>
      <SearchBar searchValue={q!} setSearchValue={setSearchValue} />
      <SearchList debouncedSearchValue={debouncedSearchValue} />
    </StyledDiscoverPage>
  );
};

export default DiscoverPage;
