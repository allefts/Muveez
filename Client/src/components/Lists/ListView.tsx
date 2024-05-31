import { Navigate, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { ListWithMovies } from "../../utils/types";

const StyledListView = styled.div`
  // width: 1400px;
  margin: 0 auto;
`;

// type ListViewingProps = {};

const ListView = () => {
  const { list, movies } = useLoaderData() as ListWithMovies;

  //List not found
  if (list.list_id === 0 && !movies) {
    return <Navigate to="/lists" replace={true} />;
  }

  return <StyledListView></StyledListView>;
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
