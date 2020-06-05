import React from "react"
// import PropTypes from "prop-types"
// import { graphql, Link } from "gatsby"
import PageLayout from "../../components/layouts/page-layout"
import { LinkButtonGeneric } from "../../components/button"

import SEO from "../../components/seo"

const Promotions = () => {
  return (
    <PageLayout>
      <SEO title="Advertise" />
      <div className="mb-3">Want to advertise on Eaveswall?</div>
      <LinkButtonGeneric href="mailto:caleb@eaveswall.com"> {/* https://wa.me/2347066029547  */}
        Contact Caleb
      </LinkButtonGeneric>
    </PageLayout>
  )
}

export default Promotions
