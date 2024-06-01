import styled from "styled-components";

const StyledListCreate = styled.div`
  // width: 1400px;
  margin: 0 auto;

  .create_header {
    font-size: 3rem;
  }

  .list_name_container {
    font-size: 1.5rem;

    label {
      margin-right: 1rem;
    }
  }
`;

// type ListCreateProps = {
//   handleBack: () => void;
// };

const ListCreate = () => {
  return (
    <StyledListCreate>
      <h1 className="create_header">Create</h1>
      <form action="">
        <div className="list_name_container">
          <label htmlFor="list_name">List Name</label>
          <input type="text" />
        </div>
        <div>Add Movies</div>
      </form>
    </StyledListCreate>
  );
};
export default ListCreate;
