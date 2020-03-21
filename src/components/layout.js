import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import FrontTile from "../components/front-tiles-img"
import Header from "./header"
import Footer from "./footer"

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
    <>
      <FrontTile>
        <div className="tile-text">
          <div className="container ">
            <div className="row">
              <section
                className="col-12 tile-lead m-auto"
                style={{ fontSize: `1.3rem` }}
              >
                {data.site.siteMetadata.title}
              </section>
            </div>
            <div className="row">
              <section
                className="col-12 tile-lead m-auto"
                style={{ fontSize: `2.3rem`, fontWeight: 500 }}
              >
                The Eaves that Drop, The Wall that Falls
              </section>
            </div>
            <div className="row">
              <section className="col-4 tile-lead m-auto"></section>
              <section className="col-8 tile-lead " style={{ fontSize: `1.2rem`, fontWeight: 500 }}>
                {data.site.siteMetadata.description}
              </section>
            </div>
          </div>
          <div className="clippy"></div>
        </div>
      </FrontTile>
      <Header siteTitle={data.site.siteMetadata.title} isHome />
      <div className="d-flex flex-column" style={{ minHeight: `calc(100vh - 102px)` }}>
        <div className="mt-5 mb-3 px-0 px-sm-3">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
