import { Navigate, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { ListWithMovies } from "../../utils/types";
import ListViewMoviesContainer from "./ListViewMoviesContainer";
import ListViewCard from "./ListViewCard";
import { toWrittenDate } from "../../utils/helpers/toDate";

const StyledListView = styled.div`
  // width: 1400px;
  margin: 0 auto;

  .list_metadata {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list_title {
    text-align: center;
    font-size: 3rem;
  }

  .list_createdAt {
  }
`;

// type ListViewingProps = {};

const ListView = () => {
  const { list, movies } = useLoaderData() as ListWithMovies;

  //List not found
  if (list.list_id === 0) {
    return <Navigate to="/lists" replace={true} />;
  }

  const renderListWithMovies = () =>
    movies.map((movie, idx) => <ListViewCard key={idx} movie={movie} />);

  return (
    <StyledListView>
      <div className="list_metadata">
        <h1 className="list_title">{list.list_name}</h1>
        <div>
          <p>{movies.length} items</p>
          <p className="list_createdAt">
            {toWrittenDate(new Date(list.created_at))}
          </p>
        </div>
      </div>
      <ListViewMoviesContainer>
        {renderListWithMovies()}
      </ListViewMoviesContainer>
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
