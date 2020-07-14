import styled from "styled-components"
import { tint } from "polished"

const StyledTitle = styled.h1`
  margin-top: 1rem;
  display: inline-block;
  color: ${({ theme: { main } }) => main.fg};
  &:after {
    content: "";
    max-width: 5ch;
    height: 5px;
    display: block;
    margin-bottom: 1rem;
    border-radius: 5px;
    background-color: ${({ theme: { themeColor } }) => tint(0.2, themeColor)};
  }
`

export default StyledTitle
