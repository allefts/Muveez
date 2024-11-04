import styled from "styled-components";
import { Outlet } from "react-router-dom";

const StyledListPage = styled.section`
  min-height: 60vh;
  max-width: 1600px;
  margin: 0 auto;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;

// type ListPageProps = {};

const ListPage = () => {
  return (
    <StyledListPage>
      <Outlet />
    </StyledListPage>
  );
};

export default ListPage;
