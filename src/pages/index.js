import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AllPosts from "../components/all-posts"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" isHome />
    <div className="d-flex flex-wrap justify-content-evenly mt-3 mb-5">
      <AllPosts />
    </div>
  </Layout>
)

export default IndexPage
