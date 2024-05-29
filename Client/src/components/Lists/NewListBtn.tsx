import { BsPlusCircle } from "react-icons/bs";
import styled from "styled-components";

const StyledNewListBtn = styled.button`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 4px 12px;
  cursor: pointer;
  border: none;
  outline: none

  background: transparent;

  svg {
    margin-left: 0.5rem;
  }
`;

const NewListBtn = () => {
  return (
    <StyledNewListBtn>
      New <BsPlusCircle size={24} />
    </StyledNewListBtn>
  );
};

export default NewListBtn;
