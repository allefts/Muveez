import styled, { keyframes } from "styled-components";
import { FetchedMovie } from "../../utils/types";

const bounceAnimation = keyframes`
from {
  transform: translateY(0px);
} to {
  transform: translateY(-10px);
}
`;

const StyledPopularMovieCard = styled.div`
  height: 175px;
  width: 125px;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  animation: ${bounceAnimation} 3s infinite alternate;
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
        animationDelay: `${idx * 0.5}s`,
      }}
    ></StyledPopularMovieCard>
  );
};

export default PopularMovieCard;
