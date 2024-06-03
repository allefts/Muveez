import { Dispatch, SetStateAction, useState } from "react";
import { BsX } from "react-icons/bs";
import styled from "styled-components";
import { Mode } from "../../utils/types";
import { createListFetcher } from "../../utils/helpers/serverFetcher";
import LineError from "../Global/LineError";
import { mutate } from "swr";

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
  const [newListName, setNewListName] = useState<string>();
  const [error, setError] = useState<string>();

  const handleCreateList = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await createListFetcher("/list", newListName);
    setError(res);
    //refreshes data across app
    mutate("/user/lists");
    setMode(Mode.DEFAULT);
  };

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
        {error ? <LineError error={error} /> : ""}
        <input
          type="text"
          id="list_name"
          placeholder="Enter list name"
          onChange={(e) => setNewListName(e.target.value)}
          autoFocus={true}
          required={true}
          minLength={1}
          maxLength={25}
          min={1}
          max={25}
        />
        <button className="submit_btn" onClick={handleCreateList} type="submit">
          Create
        </button>
      </form>
      <div></div>
    </StyledNewListForm>
  );
};
export default NewListForm;
