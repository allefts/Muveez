import { BsGrid3X2, BsListOl, BsPlus } from "react-icons/bs";
import styled from "styled-components";

const StyledListViewSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.3rem 1rem 0;
  gap: 0.25rem;

  .add_movies_btn {
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

  .right_content {
    display: flex;

    .fancy_btn,
    .compact_btn {
      padding: 4px;
      cursor: pointer;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background: none;
      border: 1px solid ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const ListViewSelector = () => {
  return (
    <StyledListViewSelector>
      <button className="add_movies_btn">
        <BsPlus size={36} />
      </button>
      <div className="right_content">
        <button className="fancy_btn">
          <BsGrid3X2 size={24} />
        </button>
        <button className="compact_btn">
          <BsListOl size={24} />
        </button>
      </div>
    </StyledListViewSelector>
  );
};

export default ListViewSelector;
