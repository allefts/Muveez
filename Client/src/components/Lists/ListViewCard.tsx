import styled from "styled-components";
import { Movie } from "../../utils/types";

const StyledListViewCard = styled.section`
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;

type ListViewCardProps = {
  movie: Movie;
};

const ListViewCard = ({ movie }: ListViewCardProps) => {
  return (
    <StyledListViewCard>
      <img src={movie.image_url} height={100} width={100} alt="Poster" />
      <h1>{movie.title}</h1>
      <h5>{movie.overview}</h5>
      <p>{movie.release_date.split("-")[0]}</p>
    </StyledListViewCard>
  );
};
export default ListViewCard;
