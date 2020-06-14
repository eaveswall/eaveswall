// import React from "react"
import styled from "styled-components"
import { BREAKPOINTS } from "../theme"

const Input = styled.input`
  padding: 0.4rem 1rem;
  border-radius: 7px;
  color: ${({ theme: { main } }) => main.day ? `#000` : `#fff`};
  background-color: ${({ theme: { main } }) => main.day ? main.bg : main.bgAlt};
  border: 1px solid ${({ theme: { main } }) => main.shade};
  width: 100%;
  transition: box-shadow ease 0.4s;
  margin: 0.5rem 0;
  @media (min-width: ${BREAKPOINTS.md}px) {
    width: 190px;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.1rem ${({ theme: { themeColor } }) => themeColor};
  }
`

const StyledInput = styled(Input)`
  color: #000;
  background-color: #fff;
  @media (min-width: ${BREAKPOINTS.md}px) {
    width: 190px;
    transition: width ease 0.4s, box-shadow ease 0.4s;
    &:focus {
      width: 250px;
    }
  }
`

const SubmitButton = styled(Input)`
  background-color: ${({ theme: { themeColor } }) => themeColor};
  color: #ffffff;
  text-align: center;
  font-weight: 500;
  position: relative;
  &:hover:not(:disabled) {
    background-color: ${({ theme: { themeColorLight } }) => themeColorLight};
    background-color: rgba(184, 11, 44, 0.95);
  }
  &:focus {
    ${'' /* box-shadow: 0 0 0 0.1rem ${({ theme: { themeColor } }) => themeColor}; */}
    box-shadow: 0 0 0 0.1rem rgba(174, 1, 34, 1);
  }
  &:disabled {
    opacity: 0.7;
  }
`

export { SubmitButton }
export default StyledInput
