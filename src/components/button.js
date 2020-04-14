import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Button = styled.button`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  color: ${({color}) => color || 'purple'};
  text-align: center;
  white-space: normal;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  *border: 2px solid rgba(0,0,0,.1);
  border-radius: 0.25rem;
  padding: 0.4rem 1rem;
  transition: all ease $trans-time;
  background-color: #ffffff;
  box-shadow: 0 0.2rem 0.28rem 0 rgba(0,0,0,.1);
  &:hover {
    color: currentColor;
    text-decoration: none;
    background-color: #f5f5f5;
  }
`

export const LinkButton = ({to, text, ...rest}) => (
  <Button as={Link} to={to} {...rest}>{text}</Button>
)

export const LinkButtonGeneric = ({to, text, ...rest}) => (
  <Button as="a" href={to} {...rest}>{text}</Button>
)

export default Button
