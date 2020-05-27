import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import PostCard from "./postcard"
import Related from "./related"

export const allMdxFragment = graphql`
  fragment AllMdxFrag on MdxConnection {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          author
          tags
          date(formatString: "ddd. MMM DD, YYYY")
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        excerpt(pruneLength: 70)
      }
    }
  }
`

const AllPosts = ({ related = false, to = [], exclude = "" }) => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(
          sort: { fields: frontmatter___date, order: DESC }
          limit: 21
          filter: { frontmatter: { publish: { eq: true } } }
          skip: 1
        ) {
          ...AllMdxFrag
        }
      }
    `
  )

  if (related) return <Related tags={to} exclude={exclude} />

  return allMdx.edges.map(({ node }) => {
    return <PostCard key={node.fields.slug} node={node} />
  })
}

AllPosts.propTypes = {
  related: PropTypes.bool,
  to: PropTypes.arrayOf(PropTypes.string),
  exclude: PropTypes.string,
}

export default AllPosts
