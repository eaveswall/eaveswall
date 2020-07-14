import styled from "styled-components"
import { Link } from "gatsby"
import { L_BREAKPOINTS } from "../theme"
import StyledTitle from "../title"
import { tint } from "polished"

const StyledFooter = styled.footer`
  background: ${({ theme: { main } }) => main.bgAlt};
  color: ${({ theme: { main, themeColorAlt } }) =>
    main.day ? themeColorAlt : tint(0.7, themeColorAlt)};
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
const StyledFooterHeading = styled(StyledTitle).attrs(() => ({ as: "div" }))`
  font-size: 1.4rem;
  font-weight: 500;
  margin-top: 1rem;
  display: inline-block;
  color: ${({ theme: { main, themeColorAlt } }) =>
    main.day ? themeColorAlt : tint(0.7, themeColorAlt)};
  @media (max-width: ${L_BREAKPOINTS.lsm}px) {
    display: block;
  }
  &:after {
    margin-bottom: 5px;
  }
`

export {
  StyledFooter,
  StyledFooterGroup,
  StyledFooterGroupItem,
  StyledFooterLink,
  StyledFooterHeading,
}
