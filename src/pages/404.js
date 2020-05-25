import React from "react"

import PageLayout from "../components/layouts/page-layout"
import SEO from "../components/seo"
import StyledTitle from "../components/title"


const NotFoundPage = () => {
  return (
    <PageLayout>
      <SEO title="404: Not found" meta={[{name: `robots`, content: `noindex`}]} />
      <div style={{ textAlign: `center` }}>
        <StyledTitle>404 NOT FOUND</StyledTitle>
        <p style={{ fontSize: `1.2rem` }}>
          Oh, ooops! There is nothing to serve here. You just landed on a route
          that doesn't exist, at least not yet.
        </p>
      </div>
    </PageLayout>
  )
}

export default NotFoundPage
