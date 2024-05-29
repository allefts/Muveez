import styled from "styled-components";
import { ListWithMovies } from "../../utils/types";

const StyledListsContents = styled.div``;

type ListsContentProps = {
  lists: ListWithMovies[];
};

const ListsContent = ({ lists }: ListsContentProps) => {
  return <StyledListsContents></StyledListsContents>;
};

export default ListsContent;
