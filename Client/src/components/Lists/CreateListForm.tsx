import { useState } from "react";
import styled from "styled-components";
import SearchMoviesInput from "./SearchMoviesInput";

const StyledCreateListForm = styled.form`
  .form_el {
    margin-bottom: 2rem;
  }

  #
`;

const CreateListForm = () => {
  const [formState, setFormState] = useState({});

  return (
    <StyledCreateListForm>
      <div className="form_el">
        <label htmlFor="list_name">List Name</label>
        <input name="list_name" id="list_name" placeholder="List Name" />
      </div>
      <div className="form_el">
        <label htmlFor="list_content">Movies</label>
        <SearchMoviesInput />
      </div>
    </StyledCreateListForm>
  );
};

export default CreateListForm;
