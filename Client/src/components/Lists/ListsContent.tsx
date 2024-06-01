import styled from "styled-components";
import NewListCard from "./NewListCard";
import { useAllUserListsWithMovies } from "../../utils/helpers/serverFetcher";
import ListCard from "./ListCard";

const StyledListsContents = styled.div`
  width: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 450px));
  grid-template-rows: auto;
  gap: 2rem;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const ListsContent = () => {
  const { lists, isLoading, isError } = useAllUserListsWithMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error....</div>;
  }

  const renderLists = () => {
    const foundLists = lists!.map((list, idx) => {
      return (
        <ListCard
          key={idx}
          list={list.list}
          moviePosterUrl={list.movies[1].image_url}
          numContents={list.movies.length}
        />
      );
    });
    return foundLists;
  };

  return (
    <StyledListsContents>
      <NewListCard />
      {renderLists()}
    </StyledListsContents>
  );
};

export default ListsContent;
