import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Clip from "../../images/svg/clip-path.inline.svg"

import {
  StyledSpot,
  StyledSpotTitle,
  StyledSpotGrid,
  StyledSpotGridChild,
  StyledSpotButton,
} from "./spotlight"

const Spotlight = ({ children, className, ...rest }) => {
  let { spotlight } = useStaticQuery(graphql`
    query {
      spotlight: allMdx(
        filter: { frontmatter: { publish: { eq: true } } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 1
      ) {
        edges {
          node {
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
            fields {
              slug
            }
            excerpt(pruneLength: 200)
          }
        }
      }
    }
  `)
  spotlight = spotlight.edges[0].node
  return (
    <>
      <StyledSpot>
        <StyledSpotGrid>
          <StyledSpotGridChild>
            <StyledSpotTitle>{spotlight.frontmatter.title}</StyledSpotTitle>
            <div className="mb-3" style={{ color: `rgba(255,255,255, .8)` }}>
              {spotlight.excerpt}
            </div>
            <div>
              <StyledSpotButton
                to={spotlight.fields.slug}
                text="Continue reading"
              />
            </div>
          </StyledSpotGridChild>

          <StyledSpotGridChild>
            <div
              style={{
                overflow: `hidden`,
                borderRadius: `5px`,
                boxShadow: `7px 7px 10px rgba(0,0,0,.2), -7px -7px 10px rgba(0,0,0,.2)`,
              }}
            >
              <Img
                fluid={
                  spotlight.frontmatter.featuredImage.childImageSharp.fluid
                }
              />
            </div>
          </StyledSpotGridChild>
        </StyledSpotGrid>
      </StyledSpot>
    </>
  )
}

export default Spotlight
