import styled from "styled-components";

const StyledListsHeader = styled.div`
  text-align: center;
  pointer-events: none;
  margin-bottom: 2rem;

  h1 {
    font-size: 3rem;
    color: ${({ theme }) => theme.text};
  }

  p {
    font-size: 1.25rem;
    opacity: 0.8;
    color: ${({ theme }) => theme.text};
  }
`;

const ListsHeader = () => {
  return (
    <StyledListsHeader>
      <h1>Your Movie Lists</h1>
      <p>Organize and manage your content with ease.</p>
    </StyledListsHeader>
  );
};
export default ListsHeader;
