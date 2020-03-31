import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

const PageLayout = ({ children }) => {
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
    <>
      <Header
        siteTitle={site.siteMetadata.title}
        color={["#ffffff", "#af3769"]}
        active={4}
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
    </>
  )
}

export default PageLayout
