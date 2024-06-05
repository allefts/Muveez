import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

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

  &::backdrop {
    backdrop-filter: blur(1px);
  }
`;

const DialogModal = ({ isOpen, onClose }: DialogModalProps) => {
  //for query params
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  //ref for modal
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  //the state toggling between modal, each time the param is changed, it triggers a rerender (useParams)
  useEffect(() => {
    if (isOpen === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  });

  const closeModal = () => {
    onClose();
  };

  return (
    <StyledDialog
      ref={dialogRef}
      className="add_modal"
      onClose={() => onClose()}
    >
      <h4>Title</h4>
      <input
        type="text"
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set("q", e.target.value);
            return prev;
          })
        }
        value={searchParams.get("q") ?? ""}
      />

      <button onClick={closeModal}>Close</button>
      <button>Ok</button>
    </StyledDialog>
  );
};

export default DialogModal;
