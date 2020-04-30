import React from "react"

import PageLayout from "../components/layouts/page-layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <PageLayout>
    <SEO title="404: Not found" />
    <div style={{ textAlign: `center` }}>
      <h1 style={{borderBottom: `5px solid #3d1928`,marginBottom: `1rem`}}><sub>4<sup>0<sup>4</sup></sup></sub> NOT FOUND <sup>4<sub>0<sub>4</sub></sub></sup></h1>
      <p style={{fontSize: `1.2rem`}}>Oh, ooops! There is nothing to serve here. You just landed on a route that doesn't exist, at least not yet.</p>
    </div>
  </PageLayout>
)

export default NotFoundPage
