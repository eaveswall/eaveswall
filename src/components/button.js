import React from "react"

import "./button.mod.scss"
import { Link } from "gatsby"

const constructStylename = (type) => {
  let style = " "
  type.forEach(value => style += `button-${value} `)
  return style
}

const Button = ({ text, type=[], ...rest }) => (
  <button styleName={`button${constructStylename(type)}`} {...rest}>{text}</button>
  // <button styleName="button button-danger button-large">{text}</button>
)

export const LinkButton = ({to, text, type=[], ...rest}) => (
  <Link to={to} styleName={`button${constructStylename(type)}link`} {...rest}>{text}</Link>
)

export const LinkButtonGeneric = ({to, text, type=[], ...rest}) => (
  <a href={to} styleName={`button${constructStylename(type)}link`} {...rest}>{text}</a>
)

export default Button
