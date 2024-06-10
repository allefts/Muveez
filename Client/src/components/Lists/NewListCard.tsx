import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import styled from "styled-components";
import NewListForm from "./NewListForm";
import { Mode } from "../../utils/types";

const StyledNewListCard = styled.div`
  padding: 2rem;
  width: 100%;
  height: 450px;
  display: grid;
  border-radius: 1rem;
  place-items: center;

  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};

  transition: all 300ms ease;
  svg {
    transition: all 300ms ease;
  }

  &:hover svg {
    transform: scale(1.25);
  }
`;

const NewListCard = () => {
  const [mode, setMode] = useState<Mode>(Mode.DEFAULT);

  return (
    <StyledNewListCard
      onClick={() => {
        if (mode !== Mode.CREATING) {
          setMode(Mode.CREATING);
        }
      }}
    >
      {mode === Mode.DEFAULT ? (
        <BsPlus size={64} className="create_btn" />
      ) : (
        <NewListForm setMode={setMode} />
      )}
    </StyledNewListCard>
  );
};

export default NewListCard;
