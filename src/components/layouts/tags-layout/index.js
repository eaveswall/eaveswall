import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import PageLayout from "../page-layout"
import StyledTitle from "../../title"
import SEO from "../../seo"
import { StyledLinkTitle, StyledList, StyledExcerpt } from "./tags-layout"
import TagsInline from "../../../images/svg/tags.inline.svg"
import { LinkButton } from "../../button"

const TagsLayout = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged "${tag}"`

  return (
    <PageLayout>
      <SEO
        title={`Tags - ${tag}`}
        image={data.allImageSharp.edges[0].node.fluid.src}
        isHome
      />
      <div style={{ margin: `3rem 0` }}>
        <StyledTitle>{tagHeader}</StyledTitle>
        <ul className="list-unstyled">
          {edges.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter

            return (
              <StyledList key={slug}>
                <StyledLinkTitle to={slug} className="d-flex">
                  {title}
                </StyledLinkTitle>
                <StyledExcerpt>
                  {node.excerpt}
                  <small className="d-block text-muted">
                    {node.frontmatter.author} &middot; {node.frontmatter.date}
                  </small>
                </StyledExcerpt>
              </StyledList>
            )
          })}
        </ul>
        <LinkButton to="/tags/">
          All tags{" "}
          <TagsInline width="20" height="20" style={{ fill: `currentColor` }} />
        </LinkButton>
      </div>
    </PageLayout>
  )
}

TagsLayout.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export const pageQuery = graphql`
  query TagsQuery($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, publish: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 250, truncate: false)
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "ddd, MMM DD, YYYY")
            title
          }
        }
      }
    }
    allImageSharp(
      filter: { fixed: { originalName: { eq: "eaveswall-icon.png" } } }
    ) {
      edges {
        node {
          fluid {
            src
          }
        }
      }
    }
  }
`

export default TagsLayout
