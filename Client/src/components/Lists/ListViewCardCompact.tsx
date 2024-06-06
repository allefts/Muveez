import styled from "styled-components";
import { Movie } from "../../utils/types";
import { BsX } from "react-icons/bs";
// import { LazyLoadImage } from "react-lazy-load-image-component";

const StyledListViewCardCompact = styled.div<{ $bgImg: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  //   background: ${({ theme }) => theme.background};
  background: url(${({ $bgImg }) => $bgImg});
  background-size: cover;
  border-radius: 0.5rem;
  padding: 0.5rem;

  .left_content {
    gap: 1rem;
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    .movie_img {
      object-fit: contain;
      //   border-radius: 50%;
    }

    .movie_title {
      color: ${({ theme }) => theme.primary};
    }
  }

  .right_content {
    .delete_btn {
      height: 40px;
      width: 40px;

      display: flex;
      align-items: center;
      justify-content: center;

      border: none;
      outline: none;
      color: ${({ theme }) => theme.primary};
      background: ${({ theme }) => theme.background};
      font-weight: bold;
      cursor: pointer;
      border-radius: 50%;

      transition: all 300ms ease;

      &:hover {
        background: ${({ theme }) => theme.body};
      }
    }
  }
`;

type ListViewCardCompactProps = {
  movie: Movie;
  idx: number;
};

const ListViewCardCompact = ({ movie, idx }: ListViewCardCompactProps) => {
  return (
    <StyledListViewCardCompact $bgImg={movie.image_url}>
      <div className="left_content">
        {/* <LazyLoadImage
          className="movie_img"
          width={75}
          height={75}
          effect="blur"
          src={movie.image_url}
          alt="Movie Poster"
        /> */}

        <p className="movie_idx">{idx}</p>
        <h4 className="movie_title">{movie.title}</h4>
        <h5 className="movie_release_date">
          {movie.release_date.split("-")[0]}
        </h5>
      </div>
      <div className="right_content">
        <button className="delete_btn">
          <BsX size={28} />
        </button>
      </div>
    </StyledListViewCardCompact>
  );
};

export default ListViewCardCompact;
