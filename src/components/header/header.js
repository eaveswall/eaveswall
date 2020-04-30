import styled from "styled-components"
import { L_BREAKPOINTS, BREAKPOINTS } from "../theme"
import { Link } from "gatsby"
import Button from "../button"

const StyledHeader = styled.header`
  background-color: ${({ theme: { primary } }) => primary};
  @supports (position: sticky) {
    position: sticky;
    top: ${({ isHome }) => (isHome ? 0 : `-52px`)};
    z-index: 10;
  }
`
const StyledHeaderGroup = styled.div`
  width: 100%;
  &:first-of-type {
    background-color: ${({ theme: { main } }) => main.bg};
    color: ${({ theme: { main } }) => main.fg};

    & > div > span {
      font-size: 1.5rem !important;
      margin: 0 0 0 1rem;
      vertical-align: top;
      a {
        color: ${({ theme: { main } }) => main.fg};
      }
    }
  }
  &:last-of-type {
    border-bottom: ${({ theme: { borderWidth } }) => borderWidth} solid
      ${({ theme: { main } }) => main.shadeAlt};
    background-color: ${({ theme: { primary } }) => primary};
    background: ${({ theme: { primaryGradient } }) => primaryGradient};
  }
`
const StyledNavContainer = styled.div`
  @media (max-width: ${L_BREAKPOINTS.lmd}px) {
    visibility: hidden;
    max-height: 0;
    opacity: 0;
    transition: all ease-in 0.4s;
    overflow: hidden;
  }
`
const StyledNavlink = styled(Link)`
  padding: 0.7rem 1rem;
  color: #ffffff;
  text-decoration: none;
  @media (max-width: ${L_BREAKPOINTS.lmd}px) {
    margin-top: -20px;
    transition: margin-top 0.4s ease;
    border-bottom: ${({ theme: { borderWidth } }) => borderWidth} solid
      ${({ theme: { main } }) => main.shade};
  }
  @media (min-width: ${BREAKPOINTS.md}px) {
    &.active {
      position: relative;
      &::after {
        content: "";
        width: 100%;
        bottom: -1px;
        left: 0;
        position: absolute;
        height: 4px;
        background-color: #ffffff;
        border-radius: 3px 3px 0 0px;
        display: block;
      }
    }
  }
  &.active,
  &:hover {
    ${'' /* background-color: rgba(0, 0, 0, 0.3); */}
    background-color: rgba(255,255,255,.1);
    color: #ffffff;
    text-decoration: none;
  }
`

const StyledNavButton = styled(Button)`
  box-shadow: none;
  padding: 10px;
  border-radius: 50%;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: white;
  position: relative;
  &::before {
    content: "";
    padding: 10px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    display: block;
    visibility: hidden;
    position: absolute;
    transform: scale(0.3);
    ${'' /* background-color: rgba(0,0,0,.2); */}
    background-color: ${({ theme: { main } }) => main.shade};
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: transparent;
    &::before {
      transform: scale(1);
      transition: transform linear 0.2s;
      visibility: visible;
    }
  }
`

export { StyledHeaderGroup, StyledNavContainer, StyledNavlink, StyledNavButton }
export default StyledHeader
