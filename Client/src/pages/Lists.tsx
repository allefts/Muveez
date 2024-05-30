import styled from "styled-components";
import { useAllUserListsWithMovies } from "../utils/helpers/serverFetcher";
import ListsActions from "../components/Lists/ListsActions";
import ListsContent from "../components/Lists/ListsContent";
import ListsHeader from "../components/Lists/ListsHeader";
import { useState } from "react";
import { ListPageState } from "../utils/types";
import ListCreate from "../components/Lists/ListCreate";

const StyledListPage = styled.section`
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ListPage = () => {
  const { lists, isLoading, isError } = useAllUserListsWithMovies();
  const [pageState, setPageState] = useState<ListPageState>(
    ListPageState.VIEWING
  );

  if (isLoading) {
    return <StyledListPage>Loading...</StyledListPage>;
  }

  if (isError) {
    return <StyledListPage>Error Getting Lists</StyledListPage>;
  }

  const renderCurrentState = () => {
    switch (pageState) {
      case ListPageState.VIEWING:
        return <ListsContent lists={lists!} setPageState={setPageState} />;
      case ListPageState.CREATING:
        return <ListCreate />;
        break;
      case ListPageState.EDITING:
        break;
    }
  };

  if (lists) {
    return (
      <StyledListPage>
        <ListsHeader />
        <ListsActions />
        {renderCurrentState()}
      </StyledListPage>
    );
  } else {
    return;
  }
};

export default ListPage;
