import styled from "styled-components";
import CreateListBtn from "../components/Lists/CreateListBtn";
// import CreateListForm from "../components/Lists/CreateListForm";

const StyledListPage = styled.section`
  padding: 0 2rem;
`;

const ListPage = () => {
  return (
    <StyledListPage>
      <CreateListBtn />
      {/* <CreateListForm /> */}
    </StyledListPage>
  );
};

export default ListPage;
