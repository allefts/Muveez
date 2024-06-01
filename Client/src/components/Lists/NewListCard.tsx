import { Dispatch, SetStateAction, useState } from "react";
import { BsPlus, BsX } from "react-icons/bs";
import styled from "styled-components";

const StyledNewListCard = styled.div`
  padding: 2rem;
  width: 100%;
  height: 450px;
  display: grid;
  border-radius: 1rem;
  place-items: center;
  cursor: pointer;

  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};

  transition: all 300ms ease;
  // filter: brightness(0.6);

  svg {
    transition: all 300ms ease;
  }

  &:hover svg {
    transform: scale(1.25);
  }
`;

enum Mode {
  DEFAULT,
  CREATING,
}

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

const StyledNewListForm = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .create_top {
    display: flex;
    align-items: center;

    .create_header {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
    }

    .close_btn {
      margin-left: auto;
      cursor: pointer;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      font-size: 1.5rem;
      margin-top: 0.5rem;
      margin-bottom: 2rem;
      width: 100%;
    }
  }

  .submit_btn {
    padding: 5px 10px;
    background: ${({ theme }) => theme.primary};
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 1rem;

    filter: brightness(0.8);
    transition: all 300ms ease;

    &:hover {
      filter: brightness(1);
    }
  }
`;

const NewListForm = ({
  setMode,
}: {
  setMode: Dispatch<SetStateAction<Mode>>;
}) => {
  const [, setNewListName] = useState<string>();

  return (
    <StyledNewListForm>
      <div className="create_top">
        <h2 className="create_header">Create List</h2>
        <BsX
          size={40}
          className="close_btn"
          onClick={() => setMode(Mode.DEFAULT)}
        />
      </div>
      <form>
        {/* <label htmlFor="list_name">Name</label> */}
        <input
          type="text"
          id="list_name"
          placeholder="Enter list name"
          onChange={(e) => setNewListName(e.target.value)}
        />
      </form>
      <button className="submit_btn">Create</button>
    </StyledNewListForm>
  );
};

export default NewListCard;
