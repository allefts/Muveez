import styled from "styled-components";
import { FetchedMovie } from "../../utils/types";
import { BsFillStarFill, BsPlus } from "react-icons/bs";
import { useParams, useRevalidator } from "react-router-dom";
import { addMovieToListFetcher } from "../../utils/helpers/serverFetcher";
import { LazyLoadImage } from "react-lazy-load-image-component";

type SearchItemProps = {
  movie: FetchedMovie;
};

const StyledSearchItem = styled.div`
  display: flex;
  align-items: center;
  //   justify-content: space-between;
  gap: 1rem;
  border-radius: 0.5rem;

  img {
    border-radius: 0.5rem;
  }

  .movie_information {
    width: 100%;

    .movie_metadata {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .movie_title {
        h3 {
          color: ${({ theme }) => theme.primary};
        }

        p {
          font-size: 0.75rem;
        }
      }

      .movie_popularity {
        display: flex;
        gap: 0.5rem;

        svg {
          margin-top: 0.05rem;
          color: ${({ theme }) => theme.primary};
        }
      }
    }
  }

  .movie_overview {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }

  .add_movie_btn {
    display: grid;
    place-items: center;
    outline: none;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    // padding: 0.25rem;
    border-radius: 50%;

    svg {
      padding: 0.25rem;
      transition: all 300ms ease;
      border-radius: 50%;

      &:hover {
        background: ${({ theme }) => theme.background};
      }
    }
  }
`;

const SearchItem = ({ movie }: SearchItemProps) => {
  //list id
  const { id } = useParams();
  const revalidator = useRevalidator();

  const addMovieToList = async () => {
    const res = await addMovieToListFetcher(`list/${id}`, movie);
    if (res) {
      revalidator.revalidate();
    }
  };

  return (
    <StyledSearchItem>
      <LazyLoadImage
        width={85}
        height={125}
        effect="blur"
        src={
          movie.image_url
            ? movie.image_url
            : "https://subscoop.com/asset/placeholder.jpg"
        }
        alt="Movie Poster"
      />
      <div className="movie_information">
        <div className="movie_metadata">
          <div className="movie_title">
            <h3>{movie.title}</h3>
            <p>{movie.release_date.split("-")[0]}</p>
          </div>
          <div className="movie_popularity">
            <BsFillStarFill />
            <span className="movie_popularity">{movie.popularity}</span>
          </div>
        </div>
        <p className="movie_overview">{movie.overview}</p>
      </div>
      <button className="add_movie_btn" onClick={addMovieToList}>
        <BsPlus size={40} />
      </button>
    </StyledSearchItem>
  );
};

export default SearchItem;
