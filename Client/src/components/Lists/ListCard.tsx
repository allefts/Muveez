import styled from "styled-components";
import { List } from "../../utils/types";
import { toWrittenDate } from "../../utils/helpers/toDate";

const StyledListCard = styled.div`
  width: 100%;
  height: 450px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  &:hover img {
    transform: scale(1.1);
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
  numContents: number;
  bgImage: string;
  handleView: () => void;
};

const ListCard = ({
  list,
  numContents = 0,
  bgImage = "",
  handleView,
}: ListCardProps) => {
  return (
    <StyledListCard>
      <div className="card_content" onClick={handleView}>
        <img src={bgImage} alt="Movie Poster" />
        <div className="left_content">
          <div>
            <h2>{list.list_name}</h2>
            <p>Created on {toWrittenDate(new Date(list.created_at))}</p>
          </div>
          <p className="num_items">{numContents} items</p>
        </div>
      </div>
    </StyledListCard>
  );
};

export default ListCard;
