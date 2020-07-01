import React from "react"
import day from "./day"
import night from "./night"
import {
  ThemeProvider,
  ThemeContext,
  createGlobalStyle,
} from "styled-components"
import { saveTheme, retrieveTheme } from "./theme-store"
import { tint, shade } from "polished"

const STATIC_THEME = {
  primary: `#3d1928`,
  primaryLight: `#732f4c`,
  themeColor: `#b80b2c`,
  themeColorLight: `#b80b4d`,
  themeColorAlt: `#1a2b2f`,
  primaryGradient: `linear-gradient(90deg, #2b121c 5%, #B80B2C 100%);`,
  secondary: `darksalmon`,
  secondaryLight: `bisque`,
  borderWidth: `1px`,
  fontsizeSM: `0.85rem`,
  fontsizeMD: `0.95rem`,
}

const SIZES = {
  tocWidth: `250px`,
  relatedPostsWidth: `370px`,
  headerHeight: `99.38px`,
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

const Style = createGlobalStyle`
  body {
    background-color: ${({ theme: { main } }) => main.bgAlt};
    color: ${({ theme: { main } }) => main.fg};
  }
  a:not([class]) {
    color: ${({ theme: { main } }) => main.fg};
    text-decoration: underline;
    &:hover {
      color: ${({ theme: { main, themeColor } }) => main.day ? shade(0.5, themeColor) : tint(0.2, themeColor)};
      text-decoration: underline dashed;
    }
  }
`

const Scrollbar = createGlobalStyle`
  @supports (scrollbar-width: thin) {
    html {
      scrollbar-color: ${({ theme: { themeColor } }) => themeColor}
        ${({ theme: { main } }) => main.bg};
      scrollbar-width: thin;
    }
  }
  ::-webkit-scrollbar {
    width: 8px !important;
  }
  ::-webkit-scrollbar-button {
    visibility: hidden !important;
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme: { main } }) => main.bg} !important;
    border-radius: 50px !important;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme: { themeColor } }) => themeColor} !important;
    border-radius: 50px !important;
  }
`

const GlobalStyle = () => (
  <>
    <Style />
    <Scrollbar />
  </>
)

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

const useThemeKey = () => {
  const theme = React.useContext(ThemeContext)
  return theme.main.day ? "day-theme" : "night-theme"
}

const SiteTheme = ({ children }) => {
  const [theme, setTheme] = React.useState(
    (typeof retrieveTheme == "function" && retrieveTheme()) || day
  )
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
  Scrollbar,
  SIZES,
  BREAKPOINTS,
  L_BREAKPOINTS,
  useThemeToggle,
  useThemeKey,
}
