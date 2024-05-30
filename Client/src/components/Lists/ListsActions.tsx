import styled from "styled-components";
import NewListBtn from "./NewListBtn";

const StyledListsActions = styled.div`
  margin: 1rem auto;
`;

const ListsActions = () => {
  return (
    <StyledListsActions>
      <NewListBtn />
    </StyledListsActions>
  );
};

export default ListsActions;
