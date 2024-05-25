import styled from "styled-components";
import { Link } from "wouter";
import NavItems from "./NavItems";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.25rem;
  margin-bottom: 2rem;

  .home_link {
    font-size: 2rem;
  }
`;

const Nav = () => {
  return (
    <StyledNav className="">
      <Link className="home_link" to="/">
        Muveez
      </Link>
      <NavItems />
    </StyledNav>
  );
};

export default Nav;
