import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { SiteTheme, GlobalStyle, SIZES } from "../theme"
import Divider from "../divider"
import { Banner } from "../header/banner"

const NakedLayout = ({ children, title }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <SiteTheme>
      <GlobalStyle />
      <Banner title={site.siteMetadata.title} subtitle={title} />
      <Divider />
      <div
        className="d-flex flex-column post-layer"
        style={{ minHeight: `calc(100vh - ${SIZES.headerHeight})` }}
      >
        <div className="px-3">
          <main>{children}</main>
        </div>
      </div>
    </SiteTheme>
  )
}

export default NakedLayout
