import styled from "styled-components";
import SearchBar from "../components/Navbar/Search";
import { useLoaderData } from "react-router-dom";
import { FetchedMovie } from "../utils/types";

const StyledDiscoverPage = styled.section``;

const DiscoverPage = () => {
  const movies = useLoaderData() as FetchedMovie[];

  return (
    <StyledDiscoverPage>
      <SearchBar />
      {movies.map((movie, idx) => {
        return (
          <div key={idx}>
            {movie.title}
            <img src={movie.image_url} height={100} width={100} />
          </div>
        );
      })}
    </StyledDiscoverPage>
  );
};

export default DiscoverPage;
