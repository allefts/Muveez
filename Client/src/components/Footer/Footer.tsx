import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: 15rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <h5>Made by allefts</h5>
      <h5>Data provided by TMDB API</h5>
    </StyledFooter>
  );
};

export default Footer;
