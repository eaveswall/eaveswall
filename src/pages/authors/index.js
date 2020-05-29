import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"

import PageLayout from "../../components/layouts/page-layout"
import StyledTitle from "../../components/title"

const Authors = ({
  data: {
    author,
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <PageLayout>
    <div
      style={{ margin: `3rem 0`, fontFamily: `Roboto`, fontSize: `0.95rem` }}
    >
      <div>
        <Helmet title={`Authors | ${title}`} />
        <div>
          <StyledTitle>Authors</StyledTitle>
          <ul className="list-unstyled d-flex flex-wrap justify-content-evenly">
            {author.edges.map(({ node }) => (
              <li
                className="flex-shrink-0 mr-3 my-3"
                key={`${node.name}-${node.id}`}
              >
                <Link to={`/authors/${kebabCase(node.name)}/`}>
                  {node.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </PageLayout>
)

Authors.propTypes = {
  data: PropTypes.shape({
    author: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            bio: PropTypes.string,
            social: PropTypes.object,
          }),
        })
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    author: allAuthorsJson {
      edges {
        node {
          id
          name
          bio
          social {
            instagram
            twitter
          }
        }
      }
    }
  }
`

export default Authors
