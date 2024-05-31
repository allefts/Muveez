import styled from "styled-components";
import ListsActions from "../components/Lists/ListsActions";
import ListsHeader from "../components/Lists/ListsHeader";
import { Outlet } from "react-router-dom";

const StyledListPage = styled.section`
  max-width: 1600px;
  margin: 0 auto;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// type ListPageProps = {};

const ListPage = () => {
  return (
    <StyledListPage>
      <ListsHeader />
      <ListsActions />
      <Outlet />
    </StyledListPage>
  );
};

export default ListPage;
