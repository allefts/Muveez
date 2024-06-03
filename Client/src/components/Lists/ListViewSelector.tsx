import { BsGrid3X2, BsListOl } from "react-icons/bs";
import styled from "styled-components";

const StyledListViewSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 0.3rem 1rem 0;
  gap: 0.25rem;

  button {
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
`;

const ListViewSelector = () => {
  return (
    <StyledListViewSelector>
      <button className="fancy_btn">
        <BsGrid3X2 size={24} />
      </button>
      <button>
        <BsListOl size={24} className="compact_btn" />
      </button>
    </StyledListViewSelector>
  );
};

export default ListViewSelector;
