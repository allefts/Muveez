import styled from "styled-components";
import { ListPageState } from "../../pages/Lists";
import { BsArrowLeft, BsPlus } from "react-icons/bs";

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

type ListActionsProps = {
  pageState: ListPageState;
  handleBack: () => void;
  handleCreate: () => void;
};

const ListsActions = ({
  pageState,
  handleBack,
  handleCreate,
}: ListActionsProps) => {
  const renderOnPageState = () => {
    switch (pageState) {
      case ListPageState.DEFAULT:
        return <BsPlus className="icon" size={40} onClick={handleCreate} />;
      case ListPageState.CREATING:
      case ListPageState.VIEWING:
        return <BsArrowLeft className="icon" size={40} onClick={handleBack} />;
    }
  };

  return <StyledListsActions>{renderOnPageState()}</StyledListsActions>;
};

export default ListsActions;
