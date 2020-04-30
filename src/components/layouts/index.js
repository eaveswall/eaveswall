import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import Header from "../header"
import Footer from "../footer"
import { SiteTheme, GlobalStyle, SIZES } from "../theme"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
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
      <Header siteTitle={data.site.siteMetadata.title} shade />
      <div
        className="d-flex flex-column"
        style={{ minHeight: `calc(100vh - ${SIZES.headerHeight})` }}
      >
        <div className="mt-5 mb-3 px-0 px-sm-3">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </SiteTheme>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout