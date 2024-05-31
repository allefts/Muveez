import styled from "styled-components";
import { useAllUserListsWithMovies } from "../utils/helpers/serverFetcher";
import ListsActions from "../components/Lists/ListsActions";
import ListsContent from "../components/Lists/ListsContent";
import ListsHeader from "../components/Lists/ListsHeader";
import { useState } from "react";
import ListCreate from "../components/Lists/ListCreate";
import ListViewing from "../components/Lists/ListView";
import { flushSync } from "react-dom";

const StyledListPage = styled.section`
  max-width: 1600px;
  margin: 0 auto;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export enum ListPageState {
  DEFAULT,
  CREATING,
  VIEWING,
}

type ListPageProps = {
  defaultState?: ListPageState;
};

const ListPage = ({ defaultState = ListPageState.DEFAULT }: ListPageProps) => {
  const { lists } = useAllUserListsWithMovies();
  const [pageState, setPageState] = useState<ListPageState>(defaultState);

  const handleBack = () => {
    setPageState(ListPageState.DEFAULT);
  };
  const handleView = () => {
    document.startViewTransition(() => {
      flushSync(() => {
        setPageState(ListPageState.VIEWING);
      });
    });
  };
  const handleCreate = () => {
    setPageState(ListPageState.CREATING);
  };

  const renderCurrentState = () => {
    switch (pageState) {
      case ListPageState.DEFAULT:
        return (
          <ListsContent
            lists={lists!}
            handleView={handleView}
            handleCreate={handleCreate}
          />
        );
      case ListPageState.CREATING:
        return <ListCreate />;
      case ListPageState.VIEWING:
        return <ListViewing />;
    }
  };

  if (lists) {
    return (
      <StyledListPage>
        <ListsHeader />
        <ListsActions
          pageState={pageState}
          handleBack={handleBack}
          handleCreate={handleCreate}
        />
        {renderCurrentState()}
      </StyledListPage>
    );
  } else {
    return;
  }
};

export default ListPage;
