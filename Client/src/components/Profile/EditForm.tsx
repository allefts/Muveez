import { ReactNode } from "react";
import styled from "styled-components";

const StyledEditForm = styled.form`
  #username {
    // font-size: 1.25rem;
  }
`;

const EditForm = ({ children }: { children: ReactNode }) => {
  return <StyledEditForm>{children}</StyledEditForm>;
};

export default EditForm;
