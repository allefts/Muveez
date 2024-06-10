import styled from "styled-components";
import { FetchedMovie } from "../../utils/types";

const StyledPopularMovieCard = styled.div`
  height: 175px;
  width: 125px;
  border-radius: 1rem;
`;

type CardProps = {
  movie: FetchedMovie;
  idx: number;
};

const PopularMovieCard = ({ movie, idx }: CardProps) => {
  return (
    <StyledPopularMovieCard
      style={{
        background: `url(${movie.image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></StyledPopularMovieCard>
  );
};

export default PopularMovieCard;
