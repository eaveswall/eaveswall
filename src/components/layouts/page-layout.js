import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../header"
import Footer from "../footer"
import { SiteTheme } from "../theme"

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
      <Header
        siteTitle={site.siteMetadata.title}
        active={activeNav || 4}
        shade
      />
      <div
        className="d-flex flex-column post-layer"
        style={{ minHeight: `calc(100vh - 102px)` }}
      >
        <div className="px-3" style={{maxWidth: `768px`, margin: `auto`}}>
          <main>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SiteTheme>
  )
}

export default PageLayout
