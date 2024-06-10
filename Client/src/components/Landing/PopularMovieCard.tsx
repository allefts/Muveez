import styled from "styled-components";
import { FetchedMovie } from "../../utils/types";

const StyledPopularMovieCard = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
`;

type CardProps = {
  movie: FetchedMovie;
};

const PopularMovieCard = ({ movie }: CardProps) => {
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
