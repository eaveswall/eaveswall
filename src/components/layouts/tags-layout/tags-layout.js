import styled from "styled-components"
import { Link } from "gatsby"


const StyledLinkTitle = styled(Link)`
  font-size: 1.5rem;
  color: ${({ theme: { main } }) => main.fg};
  &:hover {
    color: ${({ theme: { main } }) => main.fgAlt};
  }
  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0.75rem 1rem 0 0;
    background: ${({ theme: { main } }) => main.bg};
    border: 2px solid
      ${({ theme }) => (theme.main.day ? theme.primary : theme.secondary)};
  }
`
const StyledList = styled.li`
  margin-bottom: 2rem;
  position: relative;
  &:not(:last-of-type):after {
    content: "";
    display: inline-block;
    height: calc(100% + 1.5rem);
    position: absolute;
    top: 1.25rem;
    left: 0.31rem;
    width: 1px;
    background-color: ${({ theme }) =>
      theme.main.day ? theme.primary : theme.secondary};
  }
`
const StyledExcerpt = styled.div`
  margin-left: 1.7rem;
  color: ${({ theme: { main } }) => main.fgFair};
`

export { StyledLinkTitle, StyledList, StyledExcerpt }
