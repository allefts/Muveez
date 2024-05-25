import { useContext } from "react";
import { Link } from "wouter";
import { AuthContext } from "../../atoms/AuthProvider";
import styled from "styled-components";

const StyledNavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  .lists_link {
    font-size: 1.25rem;
    margin-bottom: 5.39px;
  }

  .profile_image {
    border-radius: 2rem;
    height: 50px;
  }
`;

const NavItems = () => {
  const { authState } = useContext(AuthContext);

  if (authState.user)
    return (
      <StyledNavItems>
        <Link className="lists_link" to="/lists">
          Lists
        </Link>
        <Link to="/profile">
          <img className="profile_image" src={authState.user.avatarURL} />
        </Link>
      </StyledNavItems>
    );

  return <Link to="/login">Login</Link>;
};

export default NavItems;
