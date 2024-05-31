import { BsPlus } from "react-icons/bs";
import styled from "styled-components";

const StyledNewListCard = styled.div`
  width: 100%;
  height: 450px;
  display: grid;
  border-radius: 1rem;
  place-items: center;
  cursor: pointer;

  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};

  transition: all 300ms ease;
  filter: brightness(0.6);

  svg {
    transition: all 300ms ease;
  }

  &:hover {
    filter: brightness(1);
  }

  &:hover svg {
    transform: scale(1.5);
  }
`;

// type NewListCardProps = {};

const NewListCard = () => {
  return (
    <StyledNewListCard>
      <BsPlus size={64} />
    </StyledNewListCard>
  );
};

export default NewListCard;
