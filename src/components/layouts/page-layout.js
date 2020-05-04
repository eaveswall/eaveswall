import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../header"
import Footer from "../footer"
import { SiteTheme, GlobalStyle, SIZES } from "../theme"
import Divider from "../divider"

const PageLayout = ({ children, activeNav }) => {
  const {site} = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  return (
    <SiteTheme>
      <GlobalStyle />
      <Header
        siteTitle={site.siteMetadata.title}
        active={activeNav !== void 0 ? activeNav : 4}
        shade
      />
      <div
        className="d-flex flex-column post-layer"
        style={{ minHeight: `calc(100vh - ${SIZES.headerHeight})` }}
      >
        <div className="px-3" style={{maxWidth: `768px`, margin: `auto`}}>
          <main>
            {children}
          </main>
        </div>
        <Divider />
        <Footer withCredits />
      </div>
    </SiteTheme>
  )
}

export default PageLayout
