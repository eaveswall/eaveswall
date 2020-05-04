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

import NWSForm from "../../newsletter-sub"
import AuthorDetails from "../../author-details"
import { SiteTheme, SIZES } from "../../theme"
import CreateTOC from "./toc"
import PostContent from "./post-content"
import PostPresentation from "./presentation"

const shortcodes = { Link, SEO }

const ComponentScopedGlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme: { main } }) => main.bg};
    color: ${({ theme: { main } }) => main.fg};
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
    h2, h3, h4 {
      a.anchor.before {
        text-decoration: none;
        svg {
          display: none;
        }
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
      <ComponentScopedGlobalStyle />
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
        style={{ minHeight: `calc(100vh - ${SIZES.headerHeight})` }}
      >
        {/* Related Posts */}
        <Sidebar
          className="d-none d-lg-block flex-shrink-0"
          title="Related Posts"
          width={SIZES.relatedPostsWidth}
        >
          <AllPosts
            related
            to={mdx.frontmatter.tags.split(`,`)}
            exclude={mdx.id}
          />
        </Sidebar>
        <PostContent>
          {/* Post Presentation */}
          <PostPresentation {...{ mdx, site }} />

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
              width={SIZES.tocWidth}
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
            <div className="d-xl-flex p-3 p-md-5">
              <AuthorDetails author={mdx.frontmatter.author} />
            </div>
            <NWSForm className="px-xl-5 mt-3 mt-xl-0" />
          </div>

          <Footer />
        </PostContent>
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
      parent {
        ... on File {
          id
          name
          mtf: modifiedTime(formatString: "MMM DD, YYYY")
          mtd: modifiedTime(fromNow: true)
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
