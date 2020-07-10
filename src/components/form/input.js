// import React from "react"
import styled from "styled-components"
import { BREAKPOINTS } from "../theme"

const Input = styled.div`
  position: relative;
  input:-webkit-autofill {
    border: 2px solid
      ${({ theme: { main } }) => (main.day ? "#000000" : "#1a1a1a")};
    transition: 0.4s;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme: { main } }) =>
      main.day ? `#000` : `#fff`};
    -webkit-box-shadow: 0 0 0 30px
      ${({ theme: { main } }) => (main.day ? main.bg : main.bgAlt)} inset !important;
  }
  input:-webkit-autofill:focus {
    border: 2px solid ${({ theme: { themeColor } }) => themeColor};
  }
`

const InputBox = styled.input`
  padding: 0.4rem 1rem;
  border-radius: 7px;
  color: ${({ theme: { main } }) => (main.day ? `#000` : `#fff`)};
  background-color: ${({ theme: { main } }) =>
    main.day ? main.bg : main.bgAlt};
  border: 1px solid ${({ theme: { main } }) => main.shade};
  width: 100%;
  transition: box-shadow ease 0.4s;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.1rem ${({ theme: { themeColor } }) => themeColor};
  }

  &:focus + label {
    font-size: small;
    transform: translateY(-1rem);
    background-color: ${({ theme: { main } }) =>
      main.day ? main.bg : main.bgAlt};
  }

  &:not(:placeholder-shown) + label {
    font-size: small;
    transform: translateY(-1rem);
    background-color: ${({ theme: { main } }) =>
      main.day ? main.bg : main.bgAlt};
  }
`

const StyledInputBox = styled(InputBox)`
  @media (min-width: ${BREAKPOINTS.md}px) {
    width: 190px;
    transition: width ease 0.4s, box-shadow ease 0.4s;
    &:focus {
      width: 250px;
    }
  }
`

const InputLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  /* padding: 0; */
  margin: 0.4rem 1rem;
  transition: 0.2s;
  background-color: ${({ theme: { main } }) =>
    main.day ? main.bg : main.bgAlt};
  pointer-events: none;
`

const SubmitButton = styled(InputBox)`
  background-color: ${({ theme: { themeColor } }) => themeColor};
  color: #ffffff;
  text-align: center;
  font-weight: 500;
  position: relative;
  @media (min-width: ${BREAKPOINTS.md}px) {
    width: 190px;
  }
  &:hover:not(:disabled) {
    background-color: ${({ theme: { themeColorLight } }) => themeColorLight};
    background-color: rgba(184, 11, 44, 0.95);
  }
  &:focus {
    ${"" /* box-shadow: 0 0 0 0.1rem ${({ theme: { themeColor } }) => themeColor}; */}
    box-shadow: 0 0 0 0.1rem rgba(174, 1, 34, 1);
  }
  &:disabled {
    opacity: 0.7;
  }
`

export { SubmitButton, StyledInputBox, Input, InputBox, InputLabel }
