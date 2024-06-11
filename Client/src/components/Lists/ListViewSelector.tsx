import { BsGrid3X2, BsListOl, BsPlus } from "react-icons/bs";
import styled from "styled-components";

const StyledListViewSelector = styled.div<{ $listStyle: string }>`
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

    .fancy_btn {
      background: ${({ theme, $listStyle }) =>
        $listStyle === "fanc" ? theme.background : "transparent"};
      margin-right: 0.25rem;
    }

    .compact_btn {
      background: ${({ theme, $listStyle }) =>
        $listStyle === "compact" ? theme.background : "transparent"};
    }

    .fancy_btn,
    .compact_btn {
      padding: 4px;
      cursor: pointer;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      border: 1px solid ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.primary};

      transition: all 300ms ease;

      &:hover {
        background: ${({ theme }) => theme.background};
      }
    }
  }
`;

type ListViewSelectorProps = {
  handleOpenModal: () => void;
  handleToggleSort: (srt: string) => void;
  listStyle: string;
};

const ListViewSelector = ({
  handleOpenModal,
  handleToggleSort,
  listStyle,
}: ListViewSelectorProps) => {
  return (
    <StyledListViewSelector $listStyle={listStyle}>
      <button className="add_movies_btn" onClick={handleOpenModal}>
        <BsPlus size={36} />
      </button>
      <div className="right_content">
        <button className="fancy_btn" onClick={() => handleToggleSort("FANCY")}>
          <BsGrid3X2 size={24} />
        </button>
        <button
          className="compact_btn"
          onClick={() => handleToggleSort("COMPACT")}
        >
          <BsListOl size={24} />
        </button>
      </div>
    </StyledListViewSelector>
  );
};

export default ListViewSelector;
