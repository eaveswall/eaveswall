import styled from "styled-components"
import { Link } from "gatsby"

const StyledFooter = styled.footer`
  background: ${({ theme: { main } }) => main.bgAlt};
  color: ${({ theme: { main } }) => main.fgFair};
  font-size: 0.9rem;
  font-family: "Roboto";
  padding: 1rem;
  margin: 0 0 0;
  height: fit-content;
  position: relative;
  width: 100%;
`
const StyledFooterGroup = styled.ul`
  padding: 0;
  list-style: none;
  font-weight: 400;
  & > li:not(ul ul > li) {
    font-weight: 600;
    font-weight: 2rem;
  }
`
const StyledFooterGroupItem = styled.li`
  margin: 0 0 1rem;
`
const StyledFooterLink = styled(Link)`
  color: ${({ theme: { main } }) => main.fg};
  text-decoration: underline;
  &:hover,
  &:active {
    color: currentColor;
    text-decoration: underline;
  }
`
const StyledFooterHeading = styled.div`
  font-size: 1.4rem;
  margin-top: 1rem;
  &:after {
    content: "";
    width: 100%;
    height: 5px;
    display: block;
    margin-bottom: 5px;
    background-color: ${({ theme: { main, primary, secondary } }) => main.day ? primary : secondary};
  }
`

export {
  StyledFooter,
  StyledFooterGroup,
  StyledFooterGroupItem,
  StyledFooterLink,
  StyledFooterHeading,
}
