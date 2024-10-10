import styled from "styled-components";
import NewListCard from "./NewListCard";
import { useAllUserListsWithMovies } from "../../utils/helpers/serverFetcher";
import ListCard from "./ListCard";
import Spinner from "../Global/Spinner";

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

//REFACTOR
//ONLY FETCH LISTS NOT MOVIES INSIDE THEM.
const ListsContent = () => {
  const { lists, isLoading, isError } = useAllUserListsWithMovies();

  if (isLoading) {
    return <Spinner size={50} color="#4a90e2" />;
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
          moviePosterUrl={
            list.movies.length ? list.movies[0].image_url : undefined
          }
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
