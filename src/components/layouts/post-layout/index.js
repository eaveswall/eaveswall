import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { createGlobalStyle } from "styled-components"

import Header from "../../header"
import Footer from "../../footer"
import Sidebar from "../../sidebar"
import SEO from "../../seo"
import AllPosts from "../../all-posts"

import "./post-layout.mod.scss"
import NWSForm from "../../newsletter-sub"
import AuthorDetails from "../../author-details"
import { SiteTheme } from "../../theme"

const shortcodes = { Link, SEO }

const authorTransform = (author, siteTitle) => {
  let lauthor = author.toLowerCase()
  if (lauthor === siteTitle.toLowerCase()) return "../"
  return lauthor.replace(/\s*/g, "")
}

const timeToRead = time =>
  time > 1 ? `${time} minutes read` : `${time} minute read`

function CreateTOC({ items, depth = 0 }) {
  return (
    <>
      <ul
        className="list-unstyled"
        style={{ padding: `0 0 0 ${1 * depth}rem` }}
      >
        {items.map(({ url, title, items: nestedItems }, index) => {
          return nestedItems === null || nestedItems === undefined ? (
            <li className="text-truncate" key={index}>
              <a href={`${url}`} styleName="toc-links">
                {title}
              </a>
            </li>
          ) : (
            <React.Fragment key={index}>
              {url && (
                <li className="text-truncate" key={index}>
                  <a href={`${url}`} styleName="toc-links">
                    {title}
                  </a>
                </li>
              )}
              <li>
                <CreateTOC items={nestedItems} depth={depth + 1} />
              </li>
            </React.Fragment>
          )
        })}
      </ul>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme: { main } }) => main.bg};
  }
  main.post {
    background-color: ${({ theme: { main } }) => main.bg};
    color: ${({ theme: { main } }) => main.fgAlt};
    h2, h3, h4, a {
      color: ${({ theme: { main } }) => main.fg};
    }
    a:not([class*=button]) {
      text-decoration: underline dashed;
      &:hover {
        color: darkcyan;
        text-decoration: underline dashed;
      }
    }
    img,
    span.gatsby-resp-image-background-image {
      border-radius: 20px;
      margin: 2rem 0;
    }
  }
`

const PostLayout = ({ data: { mdx, site } }) => {
  return (
    <SiteTheme>
      <GlobalStyle />
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.desc}
        keywords={mdx.frontmatter.tags.split(",")}
        meta={[
          {
            name: "author",
            content: `${mdx.frontmatter.author}`,
          },
          {
            name: "twitter:site",
            content: `${mdx.frontmatter.authorTwitter}`,
          },
        ]}
        image={mdx.frontmatter.featuredImage.childImageSharp.fluid.src}
      />
      <Header
        siteTitle={site.siteMetadata.title}
        active={mdx.frontmatter.tags.split(`,`).includes(`featured`) ? 2 : 0}
      />
      <div
        className="d-flex post-layer"
        style={{ minHeight: `calc(100vh - 60px)` }}
      >
        {/* Related Posts */}
        <Sidebar
          className="d-none d-lg-block flex-shrink-0"
          title="Related Posts"
          width="370px"
        >
          <AllPosts
            related
            to={mdx.frontmatter.tags.split(`,`)}
            exclude={mdx.id}
          />
        </Sidebar>
        <div
          className="d-flex flex-column flex-shrink-1"
          styleName="post-content"
        >
          {/* Post Presentation */}
          <div styleName="post-presentation">
            <div className="d-flex" styleName="presenter">
              <div className="flex-grow-1" styleName="presents">
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
                      <Link
                        to={`/authors/${authorTransform(
                          mdx.frontmatter.author,
                          site.siteMetadata.title
                        )}`}
                        styleName="author-link"
                      >
                        <span>{mdx.frontmatter.author}</span>
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled mr-2">
                    <li>
                      <span className="text-muted-bright">Last updated</span>
                    </li>
                    <li>
                      <span>
                        {mdx.parent.ctf} &mdash; {timeToRead(mdx.timeToRead)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-none d-md-block" styleName="presenter-image">
                <Img
                  fluid={mdx.frontmatter.featuredImage.childImageSharp.fluid}
                  fadeIn={true}
                  durationFadeIn={2000}
                />
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="flex-shrink-1">
              <div className="d-block d-md-none mb-4">
                <Img
                  fluid={mdx.frontmatter.featuredImage.childImageSharp.fluid}
                />
              </div>
              <main className="post p-3 p-md-5" role="main">
                <MDXProvider components={shortcodes}>
                  <MDXRenderer frontmatter={mdx.frontmatter}>
                    {mdx.body}
                  </MDXRenderer>
                </MDXProvider>
              </main>
            </div>
            <Sidebar
              className="d-none d-xl-block flex-shrink-0 border-rounded mt-5"
              title="Table of Contents"
              width="250px"
            >
              {mdx.tableOfContents.items !== void 0 ? (
                <CreateTOC items={mdx.tableOfContents.items} />
              ) : (
                <span style={{ textAlign: `center`, display: `block` }}>
                  There are no sub-headings
                </span>
              )}
            </Sidebar>
          </div>

          <div>
            <div className="d-xl-flex justify-content-center align-items-center p-3 p-md-5">
              <AuthorDetails author={mdx.frontmatter.author} />
            </div>
            <NWSForm className="mt-3 mt-xl-0" />
          </div>

          <Footer />
        </div>
      </div>
    </SiteTheme>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        author
        authorTwitter
        desc
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      tableOfContents
      timeToRead
      parent {
        ... on File {
          id
          name
          ctf: changeTime(formatString: "MMM DD, YYYY")
          ctd: changeTime(fromNow: true)
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default PostLayout
