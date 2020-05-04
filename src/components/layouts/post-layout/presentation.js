import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"

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
`
const PresenterImage = styled.div`
  min-width: 350px;
  max-width: 500px;
  width: 450px;
`
const AuthorLink = styled(Link)`
  color: currentColor;
  &:hover,
  &:active {
    color: #edfd07;
    text-decoration: none;
  }
`

const PostDetails = ({ mdx, site }) => {
  const authorTransform = (author, siteTitle) => {
    author = author.toLowerCase()
    if (author === siteTitle.toLowerCase()) return "../"
    return author.replace(/\s*/g, "")
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
      <div className="d-flex">
        <ul className="list-unstyled flex-shrink-0 mr-3">
          <li>
            <span className="text-muted-bright">Author</span>
          </li>
          <li>
            <AuthorLink
              to={`/authors/${authorTransform(
                mdx.frontmatter.author,
                site.siteMetadata.title
              )}`}
            >
              <span>{mdx.frontmatter.author}</span>
            </AuthorLink>
          </li>
        </ul>
        <ul className="list-unstyled mr-2">
          <li>
            <span className="text-muted-bright">Last updated</span>
          </li>
          <li>
            <span>
              {mdx.parent.mtf} {/* &mdash; {timeToRead(mdx.timeToRead)} */}
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
