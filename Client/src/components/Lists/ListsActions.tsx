import styled from "styled-components";
import { BsPlus } from "react-icons/bs";

const StyledListsActions = styled.div`
  margin: 0 auto;

  .icon {
    padding: 2px 4px;
    border-radius: 50%;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  }
`;

// type ListActionsProps = {};

const ListsActions = () => {
  return (
    <StyledListsActions>
      <BsPlus className="icon" size={40} />
    </StyledListsActions>
  );
};

export default ListsActions;
