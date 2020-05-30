import React from "react"
import { SiteTheme } from "./theme"

const BlogWrapper = ({ children }) => {
  // implement some stuff like site-wide alert here
  return <SiteTheme>{children}</SiteTheme>
}

export default BlogWrapper
