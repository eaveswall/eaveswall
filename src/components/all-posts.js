import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import Card from "../components/cards"

const AllPosts = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                author
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
    `
  )

  return (
    <>
      {allMdx.edges.map(({ node }, index) => {
        return (
          <div key={index} className="my-4">
            <Link
              to={node.fields.slug}
              style={{ textDecoration: `none`, display: `contents` }}
            >
              <Card
                title={node.frontmatter.title}
                mute={node.frontmatter.author}
                content={node.excerpt}
                image={node.frontmatter.featuredImage.childImageSharp.fluid}
              />
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default AllPosts
