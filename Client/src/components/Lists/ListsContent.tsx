import styled from "styled-components";
import { ListPageState, ListWithMovies } from "../../utils/types";
import ListCard from "./ListCard";
import NewListCard from "./NewListCard";
import { Dispatch } from "react";

const StyledListsContents = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 450px));
  grid-template-rows: auto;
  gap: 2rem;
  border-radius: 0.5rem;

  justify-content: center;
`;

type ListsContentProps = {
  lists: ListWithMovies[];
  setPageState: Dispatch<React.SetStateAction<ListPageState>>;
};

const ListsContent = ({ lists, setPageState }: ListsContentProps) => {
  const renderLists = () => {
    const foundLists = lists.map((list, idx) => {
      return (
        <ListCard
          key={idx}
          list={list.list}
          bgImage={list.movies[0].image_url}
          numContents={list.movies.length}
        />
      );
    });
    return foundLists;
  };

  return (
    <StyledListsContents
      onClick={() => {
        setPageState(ListPageState.EDITING);
      }}
    >
      {renderLists()}
      <NewListCard />
    </StyledListsContents>
  );
};

export default ListsContent;
