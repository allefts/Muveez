import styled from "styled-components";
import NavItems from "./NavItems";
import { Link } from "@swan-io/chicane";
import { Router } from "../../Router";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;

  .home_link {
    font-size: 2rem;
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
      <Link className="home_link" to={Router.Landing()}>
        Muveez
      </Link>
      <NavItems theme={theme} toggleTheme={toggleTheme} />
    </StyledNav>
  );
};

export default Nav;
