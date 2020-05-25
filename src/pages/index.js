import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layouts"
import SEO from "../components/seo"
import AllPosts from "../components/all-posts"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      icon: file(relativePath: { eq: "eaveswall-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Eaveswall" image={data.icon.childImageSharp.fluid.src} isHome />
      <div className="d-flex flex-wrap justify-content-evenly mt-3 mb-5">
        <AllPosts />
      </div>
    </Layout>
  )
}

export default IndexPage
