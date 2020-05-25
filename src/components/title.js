import styled from "styled-components"

const StyledTitle = styled.h1`
  margin-top: 1rem;
  display: inline-block;
  &:after {
    content: "";
    width: 100%;
    height: 5px;
    display: block;
    margin-bottom: 1rem;
    background-color: ${({ theme: { main, primary, secondary } }) => main.day ? primary : secondary};
  }
`

export default StyledTitle
