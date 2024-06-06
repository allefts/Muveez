import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "../../utils/hooks/useDebounce";
import SearchBar from "../Navbar/Search";
import SearchList from "../Discover/SearchList";
import { BsX } from "react-icons/bs";

type DialogModalProps = {
  isOpen: string;
  onClose: () => void;
  children: React.ReactNode;
};

const StyledDialog = styled.dialog`
  padding: 1rem;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 0.5rem;
  z-index: 10;
  width: 800px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: none;

  height: 600px;

  &::backdrop {
    backdrop-filter: blur(1px);
  }

  .modal_header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .modal_title {
      text-align: center;
    }

    .modal_close_btn {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      color: ${({ theme }) => theme.primary};
      background: ${({ theme }) => theme.body};
      font-weight: bold;
      cursor: pointer;
      border-radius: 50%;

      transition: all 300ms ease;

      &:hover {
        background: ${({ theme }) => theme.background};
      }
    }
  }
`;

const DialogModal = ({ isOpen, onClose }: DialogModalProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue);

  //ref for modal
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  //the state toggling between modal, each time the param is changed, it triggers a rerender (useParams)
  useEffect(() => {
    if (isOpen === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      setSearchValue("");
    }
  }, [isOpen, searchValue]);

  const closeModal = () => {
    setSearchValue("");
    onClose();
  };

  return (
    <StyledDialog ref={dialogRef} className="add_modal" onClose={closeModal}>
      <div className="modal_header">
        <h1 className="modal_title">Add Movies</h1>
        <button className="modal_close_btn" onClick={closeModal}>
          <BsX size={24} />
        </button>
      </div>
      <SearchBar setSearchValue={setSearchValue} />
      <SearchList debouncedSearchValue={debouncedSearchValue} />
    </StyledDialog>
  );
};

export default DialogModal;
