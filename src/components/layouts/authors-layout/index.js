import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import PageLayout from "../page-layout"
import StyledTitle from "../../title"
import SEO from "../../seo"

const AuthorsLayout = ({ pageContext, data: { authorsJson } }) => {
  return (
    <PageLayout>
      <div
        style={{ margin: `3rem 0`, fontFamily: `Roboto`, fontSize: `0.95rem` }}
      >
        <SEO
          title={`Eaveswall Authors - ${authorsJson.name}`}
          image={authorsJson.image.childImageSharp.fluid.src}
          isHome
        />
        <StyledTitle>{authorsJson.name}</StyledTitle>
        <div className="mb-3" style={{width: `150px`, height: `150px`, borderRadius: `50%`, overflow: `hidden`}}>
          <Img fluid={authorsJson.image.childImageSharp.fluid} draggable={false} />
        </div>
        <div>{authorsJson.bio}</div>
      </div>
    </PageLayout>
  )
}

AuthorsLayout.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string,
  }),
  data: PropTypes.shape({
    authorsJson: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.object,
        }),
      }),
    }),
  }),
}

export const pageQuery = graphql`
  query AuthorQuery($id: String) {
    authorsJson(id: { eq: $id }) {
      id
      name
      bio
      image {
        childImageSharp {
          fluid(maxWidth: 270) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export default AuthorsLayout
