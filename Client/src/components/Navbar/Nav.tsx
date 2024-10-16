import styled from "styled-components";
import NavItems from "./NavItems";
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
  width: 100%;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;

  @media (max-width: 464px) {
    padding: 1rem;
  }

  .home_link {
    font-size: 2rem;
    transition: all 300ms ease;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Nav = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  return (
    <StyledNav className="">
      <Link className="home_link" to="/">
        Muveez
      </Link>
      <NavItems theme={theme} toggleTheme={toggleTheme} />
    </StyledNav>
  );
};

export default Nav;
