import { FaGoogle } from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../../utils/hooks/useAuth";

const StyledLandingHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 3rem;
    span {
      color: ${({ theme }) => theme.primary};
      background: ${({ theme }) => theme.background};
    }
  }

  p {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    opacity: 0.8;
    color: ${({ theme }) => theme.text};
  }
`;

const SubmitBtn = styled.button`
  margin: 2rem auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 200px;
  background-color: ${({ theme }) => theme.text};
  // color: ${({ theme }) => theme.body};
  color: red;
  outline: none;
  border: 1px solid ${({ theme }) => theme.body};
  border-radius: 2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 300ms ease;
  font-weight: bold;

  svg {
    margin-right: 1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const LandingHeader = () => {
  const { user } = useAuth();

  const handleLoginWithGoogle = async () => {
    window.location.href = "https://api.muveez.pro/auth/google";
  };

  const authStateLanding = () => {
    if (!user) {
      return (
        <SubmitBtn onClick={handleLoginWithGoogle}>
          <FaGoogle />
          Log in with Google
        </SubmitBtn>
      );
    } else {
      return "";
    }
  };

  return (
    <StyledLandingHeader>
      <h1>
        Keep track of all your favorite <span>movies</span>
      </h1>
      <p>
        Think Spotify, but for films. Your tool to never forget what you've
        watched.
      </p>
      {authStateLanding()}
    </StyledLandingHeader>
  );
};

export default LandingHeader;
