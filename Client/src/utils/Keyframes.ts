import { keyframes } from "styled-components";

export const FadeIn = keyframes`
  from {
    opacity: 0; /* Start with opacity 0 */
  }
  to {
    opacity: 1; /* Fade in to opacity 1 */
  }
`;

export const SlideUp = keyframes`
from {
  transform: translateY(75%);
  opacity: 0;
} to {
  transform: translateY(0);
  opacity: 1;
}
`;
