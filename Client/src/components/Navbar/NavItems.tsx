import { BsBrightnessHigh, BsMoon } from "react-icons/bs";
import styled from "styled-components";
import { useUser } from "../../utils/helpers/serverFetcher";
import { Link } from "react-router-dom";

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

type NavItemProps = {
  theme: string;
  toggleTheme: () => void;
};

const NavItems = ({ theme, toggleTheme }: NavItemProps) => {
  const { user } = useUser();

  if (user)
    return (
      <StyledNavItems>
        <Link className="lists_link" to="/discover">
          Discover
        </Link>
        <Link className="lists_link" to="/lists">
          Lists
        </Link>
        <Link to="/profile">
          <img className="profile_image" src={user.avatar_url} />
        </Link>
        <ThemeSelector theme={theme} toggleTheme={toggleTheme} />
      </StyledNavItems>
    );

  return (
    <Link className="lists_link" to="/login">
      Login
    </Link>
  );
};

const StyledThemeSelector = styled.div`
  display: flex;
  alignitems: center;
  padding: 0.25rem;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.6;
  color: ${({ theme }) => theme.primary};

  transition: all 300ms ease;

  &:hover {
    opacity: 1;
  }
`;

const ThemeSelector = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  return (
    <StyledThemeSelector onClick={toggleTheme}>
      {theme === "dark" ? (
        <BsBrightnessHigh title="Bright Theme" size="1.25rem" />
      ) : (
        <BsMoon title="Dark Theme" size="1.25rem" />
      )}
    </StyledThemeSelector>
  );
};

export default NavItems;
