import React from "react"
import day from "./day"
import night from "./night"
import { ThemeProvider, createGlobalStyle } from "styled-components"

const STATIC_THEME = {
  primary: `#3d1928`,
  primaryLight: `#732f4c`,
  primaryGradient: `linear-gradient(90deg, #2b121c 5%, #3d1928 50%, #732f4c 100%);`,
  secondary: `darksalmon`,
  secondaryLight: `bisque`,
  borderWidth: `1px`,
  fontsizeSM: `.85rem`,
}

const SIZES = {
  tocWidth: `250px`,
  relatedPostsWidth: `370px`,
  headerHeight: `99.38px`
}

const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  df: 0.02,
}

const L_BREAKPOINTS = {
  lsm: 576 - BREAKPOINTS.df,
  lmd: 768 - BREAKPOINTS.df,
  llg: 992 - BREAKPOINTS.df,
  lxl: 1200 - BREAKPOINTS.df,
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme: { main } }) => main.bgAlt};
    color: ${({ theme: { main } }) => main.fg};
  }
`

const saveTheme = theme => {
  localStorage.setItem("theme", JSON.stringify(theme))
}

const retrieveTheme = () => {
  return JSON.parse(localStorage.getItem("theme"))
}

const ThemeUpdaterContext = React.createContext()
const useThemeToggle = () => {
  const setTheme = React.useContext(ThemeUpdaterContext)
  const toggle = React.useCallback(() => {
    return setTheme(theme => {
      const nextTheme = theme.day ? night : day
      saveTheme(nextTheme)
      return nextTheme
    })
  }, [setTheme])
  return toggle
}

const SiteTheme = ({ children }) => {
  const [theme, setTheme] = React.useState(retrieveTheme() || day)
  return (
    <ThemeProvider
      theme={{
        ...STATIC_THEME,
        ...SIZES,
        ...BREAKPOINTS,
        ...L_BREAKPOINTS,
        main: { ...theme },
      }}
    >
      <ThemeUpdaterContext.Provider value={setTheme}>
        {children}
      </ThemeUpdaterContext.Provider>
    </ThemeProvider>
  )
}

export {
  SiteTheme,
  GlobalStyle,
  SIZES,
  BREAKPOINTS,
  L_BREAKPOINTS,
  saveTheme,
  retrieveTheme,
  useThemeToggle,
}
