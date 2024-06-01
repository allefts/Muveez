import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <StyledListsActions>
      <BsArrowLeft className="icon" size={40} onClick={() => navigate(-1)} />
    </StyledListsActions>
  );
};

export default ListsActions;
