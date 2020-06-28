import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import {
  StyledSpot,
  StyledSpotTitle,
  StyledSpotGrid,
  StyledSpotGridChild,
  StyledSpotButton,
} from "./spotlight"

import ArrowRight from "../../images/svg/arrow-right.inline.svg"

const Spotlight = () => {
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
                  fluid(maxWidth: 1200) {
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
              <StyledSpotButton to={spotlight.fields.slug}>
                Continue reading
                <span className="ml-1">
                  <ArrowRight
                    presentation="true"
                    style={{ fill: `currentColor` }}
                  />
                </span>
              </StyledSpotButton>
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

Spotlight.propTypes = {
  data: PropTypes.shape({
    spotlight: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              author: PropTypes.string,
              featuredImage: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                  fluid: PropTypes.object,
                }),
              }),
            }),
            field: PropTypes.shape({
              slug: PropTypes.string,
            }),
            excerpt: PropTypes.string,
          }),
        })
      ),
    }),
  }),
}

export default Spotlight
