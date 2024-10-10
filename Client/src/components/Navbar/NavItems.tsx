import { BsBrightnessHigh, BsMoon } from "react-icons/bs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";

const StyledNavItems = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 2rem;

  .lists_link {
    font-size: 1.25rem;
    transition: all 300ms ease;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  div {
    @media (max-width: 464px) {
      display: none;
    }
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
  // const { user } = useUser();
  const { user } = useAuth();

  if (user)
    return (
      <StyledNavItems>
        <Link className="lists_link" to="/lists">
          Lists
        </Link>
        <ThemeSelector theme={theme} toggleTheme={toggleTheme} />
        <Link to="/profile">
          <img className="profile_image" src={user.avatar_url} />
        </Link>
      </StyledNavItems>
    );

  return <ThemeSelector theme={theme} toggleTheme={toggleTheme} />;
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
