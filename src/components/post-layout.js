import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
import SEO from "./seo"
import AllPosts from "./all-posts"

import "./post-layout.mod.scss"

const shortcodes = { Link, SEO }

function CreateTOC({ items, depth = 0 }) {
  return (
    <>
      <ul className="list-unstyled" style={{ padding: `0 ${1 * depth}rem` }}>
        {items.map(({ url, title, items: nestedItems }, index) => {
          return nestedItems === null || nestedItems === undefined ? (
            <li className="text-truncate" key={index}>
              <a href={`${url}`} styleName="toc-links">{title}</a>
            </li>
          ) : (
            <React.Fragment key={index}>
              <li className="text-truncate" key={index}>
                <a href={`${url}`} styleName="toc-links">{title}</a>
              </li>
              <CreateTOC items={nestedItems} depth={++depth} />
            </React.Fragment>
          )
        })}
      </ul>
    </>
  )
}

const PostLayout = ({ data: { mdx, site } }) => {
  return (
    <>
      <Header
        siteTitle={site.siteMetadata.title}
        color={["#ffffff", "#af3769"]}
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
          <AllPosts />
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
                  <p style={{opacity: .8}}>{mdx.frontmatter.desc}</p>
                </div>
                <div className="d-flex">
                  <ul className="list-unstyled flex-shrink-0 mr-3">
                    <li>
                      <strong className="text-muted-bright">Author</strong>
                    </li>
                    <li>
                      <Link
                        to={`/authors/@${mdx.frontmatter.author}`}
                        styleName="author-link"
                      >
                        <strong>{mdx.frontmatter.author}</strong>
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled mr-2">
                    <li>
                      <strong className="text-muted-bright">
                        Last updated
                      </strong>
                    </li>
                    <li>
                      <strong>
                        {mdx.parent.ctf} &mdash; {mdx.parent.ctd}
                      </strong>
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
              <main className="p-3 p-md-5">
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
              <CreateTOC items={mdx.tableOfContents.items} />
            </Sidebar>
          </div>
          <Footer />
        </div>
      </div>
    </>
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