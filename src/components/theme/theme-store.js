export const saveTheme = theme => {
  window !== undefined && window.localStorage.setItem("theme", JSON.stringify(theme))
}

export const retrieveTheme = () => {
  return window !== undefined ? JSON.parse(window.localStorage.getItem("theme")) : null
}
