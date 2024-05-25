import styled from "styled-components";
import { Link } from "wouter";
import NavItems from "./NavItems";
import SearchBar from "./Search";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;

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
      <SearchBar />
      <NavItems theme={theme} toggleTheme={toggleTheme} />
    </StyledNav>
  );
};

export default Nav;
