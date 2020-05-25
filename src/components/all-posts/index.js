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
          date(formatString: "ddd, MMM DD, YYYY")
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
    }
  }
`

const resolveAllMdx = allMdx => {
  return {
    ...allMdx,
    edges: [...allMdx.edges].reverse(),
  }
}

const AllPosts = ({ related = false, to = [], exclude = "" }) => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx {
          ...AllMdxFrag
        }
      }
    `
  )
  const allMdxResolved = resolveAllMdx(allMdx)

  if (related)
    return <Related data={allMdxResolved} tags={to} exclude={exclude} />

  return allMdxResolved.edges.map(({ node }, index) => {
    return <PostCard key={index} node={node} />
  })
}

AllPosts.propTypes = {
  related: PropTypes.bool,
  to: PropTypes.arrayOf(PropTypes.string),
  exclude: PropTypes.string,
}

export default AllPosts
