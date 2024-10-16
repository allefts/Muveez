import styled from "styled-components";
import { toWrittenDate } from "../../utils/helpers/toDate";
import { List } from "../../utils/types";
import { Link } from "react-router-dom";

const StyledListCard = styled.div`
  width: 100%;
  height: 450px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  &:hover img {
    transform: scale(1.1);
    filter: brightness(1);
  }

  &:hover .card_content {
    filter: brightness(1);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: auto;
    object-fit: cover;
    filter: brightness(0.6);
    transition: all 300ms ease;
  }

  .card_content {
    height: 100%;
    padding: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    transition: all 300ms ease;
    filter: brightness(0.8);

    color: ${({ theme }) => theme.primary};

    .left_content {
      font-size: 0.9rem;
      width: 95%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;

      .num_items {
        padding: 4px 8px;
        border-radius: 0.5rem;
        background: ${({ theme }) => theme.body};
      }
    }
  }
`;

type ListCardProps = {
  list: List;
  moviePosterUrl?: string;
  numContents: number;
};

const ListCard = ({
  list,
  moviePosterUrl = "https://subscoop.com/asset/placeholder.jpg",
  numContents = 0,
}: ListCardProps) => {
  return (
    <StyledListCard>
      <Link to={`${list.list_id}`} style={{ textDecoration: "none" }}>
        <div className="card_content">
          <img src={moviePosterUrl} alt="Movie Poster" />
          <div className="left_content">
            <div>
              <h1>{list.list_name}</h1>
              <p>Created on {toWrittenDate(new Date(list.created_at))}</p>
            </div>
            <p className="num_items">{numContents} items</p>
          </div>
        </div>
      </Link>
    </StyledListCard>
  );
};

export default ListCard;
