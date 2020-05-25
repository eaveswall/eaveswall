import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../header"
import Footer from "../footer"
import { SiteTheme, GlobalStyle, SIZES } from "../theme"
import Divider from "../divider"
import { createGlobalStyle } from "styled-components"
import NWSForm from "../newsletter-sub"

const ComponentScopedGlobalStyle = createGlobalStyle`
  .content-layer {
    background-color: ${({ theme: {main} }) => main.bg};
  }
`

const PageLayout = ({ children, activeNav = null }) => {
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
      <ComponentScopedGlobalStyle />
      <Header
        siteTitle={site.siteMetadata.title}
        active={activeNav !== void 0 ? activeNav : 4}
        shade
      />
      <div
        className="d-flex flex-column content-layer"
        style={{ minHeight: `calc(100vh - ${SIZES.headerHeight})` }}
      >
        <div className="px-3" style={{maxWidth: `768px`, margin: `auto`}}>
          <main>
            {children}
          </main>
        </div>
        <Divider />
        <NWSForm className="px-xl-5" />
        <Footer withCredits />
      </div>
    </SiteTheme>
  )
}

export default PageLayout
