import styled from "styled-components";
import { useSearchForMovies } from "../../utils/helpers/movieFetcher";
import SearchItem from "./SearchItem";

type SearchListProps = {
  debouncedSearchValue: string;
};

const StyledSearchList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const SearchList = ({ debouncedSearchValue }: SearchListProps) => {
  const { data, isLoading, isError } = useSearchForMovies(debouncedSearchValue);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error....</div>;
  }

  if (data) {
    const renderSearchItems = data.map((movie, idx) => (
      <SearchItem key={idx} movie={movie} />
    ));

    return <StyledSearchList>{renderSearchItems}</StyledSearchList>;
  }
};

export default SearchList;
