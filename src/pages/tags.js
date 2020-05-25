import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import PageLayout from "../components/layouts/page-layout"
import StyledTitle from "../components/title"
import { StyledTagLinks } from "../components/layouts/post-layout/tags"

const sortPopular = (a, b) => b.totalCount - a.totalCount
const sortAtoZ = (a, b) =>
  a.fieldValue.toLowerCase() > b.fieldValue.toLowerCase() ? 1 : -1
const sortZtoA = (a, b) =>
  a.fieldValue.toLowerCase() > b.fieldValue.toLowerCase() ? -1 : 1

const TagsPage = ({
  data: {
    allMdx: { group },
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
        <Helmet title={`Tags | ${title}`} />
        <div>
          <StyledTitle>Tags</StyledTitle>
          <ul className="list-unstyled d-flex flex-wrap justify-content-evenly">
            {group.sort(sortAtoZ).map(tag => (
              <li className="flex-shrink-0 mr-3 my-3" key={tag.fieldValue}>
                <StyledTagLinks
                  to={`/tags/${kebabCase(tag.fieldValue)}/`}
                  style={{ padding: `0.4rem 1rem` }}
                >
                  {tag.fieldValue} ({tag.totalCount})
                </StyledTagLinks>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </PageLayout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
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
    allMdx(limit: 2000, filter: { frontmatter: { publish: { eq: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default TagsPage
