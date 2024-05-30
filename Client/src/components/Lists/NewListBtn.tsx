import { BsPlus } from "react-icons/bs";
import styled from "styled-components";

const StyledNewListBtn = styled.button`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 4px 12px;
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  outline: none;

  background: ${({ theme }) => theme.primary};

  svg {
    margin-left: 0.25rem;
  }
`;

const NewListBtn = () => {
  return (
    <StyledNewListBtn>
      New <BsPlus size={24} />
    </StyledNewListBtn>
  );
};

export default NewListBtn;
