import styled from "styled-components";
import { Movie } from "../../utils/types";
import { BsPlusLg } from "react-icons/bs";
import { deleteListFetcher } from "../../utils/helpers/serverFetcher";
import { useParams, useRevalidator } from "react-router-dom";

const StyledListViewCard = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  position: relative;

  &:hover .delete_btn {
    opacity: 1;
  }

  .delete_btn {
    height: 40px;
    width: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    right: 0;

    border: none;
    outline: none;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.background};
    margin: 0.5rem 0.5rem 0 0;
    font-weight: bold;
    cursor: pointer;
    border-radius: 50%;

    transition: all 300ms ease;
    opacity: 0;

    &:hover {
      background: ${({ theme }) => theme.body};
    }

    svg {
      transform: rotate(45deg);
    }
  }

  .card_bg {
    height: 90%;
    width: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .card_content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.background};
    border-radius: 0 0 0.5rem 0.5rem;

    h4 {
      color: ${({ theme }) => theme.text};
    }
  }
`;

type ListViewCardProps = {
  movie: Movie;
};

const ListViewCard = ({ movie }: ListViewCardProps) => {
  const listId = useParams()["id"];
  const revalidator = useRevalidator();

  const handleDeleteMovieFromList = async () => {
    const res = await deleteListFetcher(
      "/list",
      parseInt(listId!),
      movie.movie_id
    );
    if (res) {
      revalidator.revalidate();
    }
  };

  return (
    <StyledListViewCard>
      <button className="delete_btn" onClick={handleDeleteMovieFromList}>
        <BsPlusLg size={24} />
      </button>
      <div className="card_bg">
        <img src={movie.image_url} alt="Poster" />
      </div>
      <div className="card_content">
        <h4>{movie.release_date.split("-")[0]}</h4>
      </div>
    </StyledListViewCard>
  );
};
export default ListViewCard;
