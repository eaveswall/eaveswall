import styled from "styled-components"
import { Link } from "gatsby"
import { L_BREAKPOINTS } from "../theme"

const StyledFooter = styled.footer`
  background: ${({ theme: { main } }) => main.bgAlt};
  color: ${({ theme: { main, themeColorAlt } }) =>
    main.day ? themeColorAlt : main.fgFair};
  font-size: 0.9rem;
  font-family: "Roboto";
  font-weight: 500;
  padding: 1rem;
  margin: 0 0 0;
  height: fit-content;
  position: relative;
  width: 100%;
`
const StyledFooterGroup = styled.ul`
  padding: 0;
  list-style: none;
  font-weight: 500;
`
const StyledFooterGroupItem = styled.li`
  margin: 0 0 1rem;
`
const StyledFooterLink = styled(Link)`
  color: currentColor;
  text-decoration: underline;
  font-weight: 500;
  &:hover,
  &:active {
    color: ${({ theme: { main } }) => main.fg};
    text-decoration: underline;
  }
`
const StyledFooterHeading = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-top: 1rem;
  display: inline-block;
  color: ${({ theme: { main } }) => main.fg};
  @media (max-width: ${L_BREAKPOINTS.lsm}px) {
    display: block;
  }
  &:after {
    content: "";
    width: 100%;
    height: 5px;
    display: block;
    margin-bottom: 5px;
    background-color: ${({ theme: { main, primary, secondary } }) =>
      main.day ? primary : secondary};
  }
`

export {
  StyledFooter,
  StyledFooterGroup,
  StyledFooterGroupItem,
  StyledFooterLink,
  StyledFooterHeading,
}
