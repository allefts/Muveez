import styled from "styled-components";
import { SlideUp } from "../utils/Keyframes";

const StyledLineError = styled.div`
  margin: 0.3rem 0;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;

  animation: ${SlideUp} 300ms ease;

  .errorIcon {
    margin-right: 0.25rem;
    color: #ef4040;
    display: flex;
    align-items: center;
  }
`;

const LineError = ({ msg }: { msg: string }) => {
  return (
    <StyledLineError>
      <p>{msg}</p>
    </StyledLineError>
  );
};

export default LineError;
