import styled from "styled-components";
import NavItems from "./NavItems";
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;

  display: flex;
  flex-flow: row wrap;
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
      <Link className="home_link" to="/">
        Muveez
      </Link>
      <NavItems theme={theme} toggleTheme={toggleTheme} />
    </StyledNav>
  );
};

export default Nav;
