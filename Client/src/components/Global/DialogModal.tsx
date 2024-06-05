import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "../../utils/hooks/useDebounce";
import SearchBar from "../Navbar/Search";
import SearchList from "../Discover/SearchList";

type DialogModalProps = {
  isOpen: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
};

const StyledDialog = styled.dialog`
  padding: 0.5rem;
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

  .modal_title {
    text-align: center;
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
  }, [isOpen]);

  const closeModal = () => {
    setSearchValue("");
    onClose();
  };

  return (
    <StyledDialog ref={dialogRef} className="add_modal" onClose={closeModal}>
      <h1 className="modal_title">Add Movies</h1>
      <SearchBar setSearchValue={setSearchValue} />
      <SearchList debouncedSearchValue={debouncedSearchValue} />
      <button>Ok</button>
    </StyledDialog>
  );
};

export default DialogModal;
