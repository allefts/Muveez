import styled from "styled-components";
import { useAllUserListsWithMovies } from "../utils/helpers/serverFetcher";
import ListsActions from "../components/Lists/ListsActions";
import ListsContent from "../components/Lists/ListsContent";

const StyledListPage = styled.section`
  margin: 2rem;
  padding: 2rem;

  border: 2px solid green;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ListPage = () => {
  const { lists, isLoading, isError } = useAllUserListsWithMovies();

  if (isLoading) {
    return <StyledListPage>Loading...</StyledListPage>;
  }

  if (isError) {
    return <StyledListPage>Error Getting Lists</StyledListPage>;
  }

  if (lists) {
    return (
      <StyledListPage>
        <ListsActions />
        <ListsContent lists={lists} />
      </StyledListPage>
    );
  } else {
    return;
  }
};

export default ListPage;
