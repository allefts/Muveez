import styled from "styled-components";
import { ListWithMovies } from "../../utils/types";
import ListCard from "./ListCard";
import NewListCard from "./NewListCard";

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

type ListsContentProps = {
  lists: ListWithMovies[];
  handleView: () => void;
  handleCreate: () => void;
};

const ListsContent = ({
  lists,
  handleCreate,
  handleView,
}: ListsContentProps) => {
  const renderLists = () => {
    const foundLists = lists.map((list, idx) => {
      return (
        <ListCard
          key={idx}
          list={list.list}
          bgImage={list.movies[0].image_url}
          numContents={list.movies.length}
          handleView={handleView}
        />
      );
    });
    return foundLists;
  };

  return (
    <StyledListsContents>
      {renderLists()}
      <NewListCard handleCreate={handleCreate} />
    </StyledListsContents>
  );
};

export default ListsContent;
