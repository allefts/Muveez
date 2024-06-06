import { useLoaderData, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ListWithMovies } from "../../utils/types";
import ListViewMoviesContainer from "./ListViewMoviesContainer";
import { toWrittenDate } from "../../utils/helpers/toDate";
import ListViewSelector from "./ListViewSelector";
import DialogModal from "../Global/DialogModal";

const StyledListView = styled.div`
  margin: 0 2rem;

  .list_metadata {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .list_title {
    text-align: center;
    font-size: 3rem;
  }
`;

// type ListViewingProps = {};

const ListView = () => {
  const { list, movies } = useLoaderData() as ListWithMovies;
  //Start a new search param with dia set to no
  const [searchParams, setSearchParams] = useSearchParams({
    dia: "n",
    sort: "compact",
  });
  //Get dia
  const modalOpen = searchParams.get("dia")!;
  const listStyle = searchParams.get("sort")!;

  //Opens modal
  const handleOpenModal = () => {
    setSearchParams(
      (prev) => {
        prev.set("dia", "y");
        return prev;
      },
      { replace: true }
    );
  };

  const handleToggleSort = (srt: string) => {
    if (srt === "FANCY") {
      setSearchParams(
        (prev) => {
          prev.set("sort", "fanc");
          return prev;
        },
        { replace: true }
      );
      setSearchParams(searchParams);
    } else if (srt === "COMPACT") {
      setSearchParams(
        (prev) => {
          prev.set("sort", "comp");
          return prev;
        },
        { replace: true }
      );
    }
  };

  //runs after modal closes, cleanup function
  const onClose = () => {
    //remove all params we placed
    setSearchParams(
      (prev) => {
        prev.set("dia", "n");
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <StyledListView>
      <DialogModal onClose={onClose} children={undefined} isOpen={modalOpen} />
      <div className="list_metadata">
        <h1 className="list_title">{list.list_name}</h1>
        <div>
          <p>{movies.length} items</p>
          <p className="list_createdAt">
            {toWrittenDate(new Date(list.created_at))}
          </p>
        </div>
      </div>
      <ListViewSelector
        handleOpenModal={handleOpenModal}
        handleToggleSort={handleToggleSort}
        listStyle={listStyle}
      />
      <ListViewMoviesContainer listStyle={listStyle} movies={movies} />
    </StyledListView>
  );
};

export default ListView;

//SWR WAY
// const listId = useParams()["id"];
// const { list, isLoading, isError } = useListWithMovies(listId!);

// if (isLoading) {
//   return <div>Loading...</div>;
// }
// if (isError) {
//   return <div>{isError}</div>;
// }
