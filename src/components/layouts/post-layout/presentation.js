import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { fluidRange } from "polished"
import { BREAKPOINTS } from "../../theme"

const Presentation = styled.div`
  background-color: ${({ theme: { primary } }) => primary};
  background: ${({ theme: { primaryGradient } }) => primaryGradient};
`
const Presents = styled.div`
  color: #e1e1e1;
  padding: 1rem;
  h1 {
    color: #ffffff;
  }
  display: flex;
  flex-direction: column;
`
const PresenterImage = styled.div`
  min-width: 350px;
  max-width: 500px;
  width: 450px;
`
const AuthorLink = styled(Link)`
  color: currentColor;
  ${fluidRange(
    { prop: "max-width", fromSize: "10ch", toSize: "100ch" },
    '0px',
    `${BREAKPOINTS.sm}px`
  )};
  &:hover,
  &:active {
    color: #edfd07;
    text-decoration: none;
  }
`

const PostDetails = ({ mdx, site }) => {
  const authorTransform = (author, siteTitle) => {
    if (author === siteTitle.toLowerCase()) return "../"
    return kebabCase(author)
  }

  const timeToRead = time => {
    return time > 1 ? `${time} minutes read` : `${time} minute read`
  }
  return (
    <>
      <h1>{mdx.frontmatter.title}</h1>
      <div>
        <p style={{ opacity: 0.8 }}>{mdx.frontmatter.desc}</p>
      </div>
      <div className="d-flex mt-auto">
        <ul className="list-unstyled flex-shrink-0 mr-3" role="presentation">
          <li role="presentation">
            <span
              className="text-muted-bright"
              id="author_desc"
              style={{ fontSize: `0.95rem` }}
            >
              Author
            </span>
          </li>
          <li role="presentation">
            <AuthorLink
              to={`/authors/${authorTransform(
                mdx.frontmatter.author,
                site.siteMetadata.title
              )}`}
            >
              <span
                className="d-block text-truncate"
                style={{ maxWidth: `inherit` }}
                aria-describedby="author_desc"
              >
                {mdx.frontmatter.author}
              </span>
            </AuthorLink>
          </li>
        </ul>
        <ul className="list-unstyled mr-2" role="presentation">
          <li role="presentation">
            <span
              className="text-muted-bright"
              id="last_mod_desc"
              style={{ fontSize: `0.95rem` }}
            >
              Last updated
            </span>
          </li>
          <li role="presentation">
            <span aria-describedby="last_mod_desc">
              {mdx.frontmatter.last_modified} &mdash;{" "}
              {timeToRead(mdx.timeToRead)}
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}

const PostPresentation = ({ mdx, site }) => {
  return (
    <Presentation>
      <div className="d-flex">
        <Presents className="flex-grow-1">
          <PostDetails {...{ mdx, site }} />
        </Presents>
        <PresenterImage className="d-none d-md-block">
          <Img
            fluid={mdx.frontmatter.featuredImage.childImageSharp.fluid}
            fadeIn={true}
            durationFadeIn={2000}
          />
        </PresenterImage>
      </div>
    </Presentation>
  )
}

export default PostPresentation
