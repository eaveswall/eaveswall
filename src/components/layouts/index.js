import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../header"
import Footer from "../footer"
import { SiteTheme, GlobalStyle, SIZES } from "../theme"
import NWSForm from "../newsletter-sub"
import Divider from "../divider"
import Spotlight from "../spotlight"

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
      <Header siteTitle={data.site.siteMetadata.title} sticky isHome />
      <Spotlight />
      <div
        className="d-flex flex-column"
        style={{ minHeight: `calc(100vh - ${SIZES.headerHeight})` }}
      >
        <div className="mt-5 mb-3 px-0 px-sm-3">
          <main>{children}</main>
        </div>

        <div className="mt-auto">
          <Divider />
          <NWSForm className="px-xl-5" />
          <Footer withCredits />
        </div>

      </div>
    </SiteTheme>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
