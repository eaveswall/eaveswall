import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AllPosts from "../components/all-posts"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" isHome />
    <div className="d-flex flex-wrap justify-content-evenly mt-3 mb-5">
      <AllPosts />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/page-3/">Go to page 3</Link>
  </Layout>
)

export default IndexPage
