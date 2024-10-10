import styled from "styled-components";
import { useSearchForMovies } from "../../utils/helpers/movieFetcher";
import SearchItem from "./SearchItem";
import { FetchedMovie } from "../../utils/types";
import Spinner from "../Global/Spinner";

type SearchListProps = {
  debouncedSearchValue: string;
  addMovieToList: (id: string, movie: FetchedMovie) => Promise<void>;
};

const StyledSearchList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  overflow: auto;
`;

const SearchList = ({
  debouncedSearchValue,
  addMovieToList,
}: SearchListProps) => {
  const { data, isLoading, isError } = useSearchForMovies(debouncedSearchValue);

  if (isLoading) {
    return <Spinner size={50} color="#4a90e2" />;
  }

  if (isError) {
    return <div>Error....</div>;
  }

  if (data) {
    const renderSearchItems = data.map((movie, idx) => (
      <SearchItem key={idx} movie={movie} addMovieToList={addMovieToList} />
    ));

    return <StyledSearchList>{renderSearchItems}</StyledSearchList>;
  }
};

export default SearchList;
