import React from "react"

import { StyledNavButton } from "./header"
import Bright from "../../images/svg/brightness-up.inline.svg"
import Dull from "../../images/svg/brightness-down.inline.svg"
import { useThemeToggle } from "../theme"
import { ThemeContext } from "styled-components"

const Icon = ({ light }) => {
  // const theme = React.useContext(ThemeContext)
  return (
    <>
      <span className="mx-0" style={{ fill: `rgba(255, 255, 255, 1)` }}>
        {light ? (
          <Bright width="30" height="30" presentation="true" />
        ) : (
          <Dull width="30" height="30" presentation="true" />
        )}
      </span>
    </>
  )
}

const ThemeSwitch = ({ className, ...rest }) => {
  const theme = React.useContext(ThemeContext)
  const [light, setLight] = React.useState(theme.main.day)
  const toggle = useThemeToggle()
  const handleClick = () => {
    setLight(!light)
    toggle()
  }
  return (
    <div className={className} {...rest}>
      <StyledNavButton style={{ padding: `0.5rem` }} onClick={handleClick}>
        <Icon light={light} />
        <span className="sr-only">
          {theme.main.day ? "Daylight mode" : "Night mode"}
        </span>
      </StyledNavButton>
    </div>
  )
}

export default ThemeSwitch
