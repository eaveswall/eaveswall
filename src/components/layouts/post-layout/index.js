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
import { SIZES, BREAKPOINTS } from "../../theme"
import CreateTOC from "./toc"
import PostContent from "./post-content"
import PostPresentation from "./presentation"
import Tags from "./tags"
import IntentShare from "./share"

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
      text-decoration: underline;
      &:hover {
        color: cornflowerblue;
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
    blockquote:not([class]) {
      color: ${({ theme: { main } }) => main.fg};
      padding: 1rem;
      border-left-width: 5px;
      border-left-style: solid;
      border-left-color: ${({ theme }) =>
        theme.main.day ? theme.primary : theme.secondary};
      p:last-of-type {
        margin: 0;
      }
    }
  }
`

const updateSidebarHeight = (header, sideNav) => {
  const headerHeight = header.offsetHeight
  const sidebarHeight = parseInt(getComputedStyle(sideNav).height) // statically store sideNav height
  const onScroll = () => {
    sideNav.style.maxHeight =
      document.documentElement.scrollTop > headerHeight
        ? `${sidebarHeight + headerHeight}px`
        : document.documentElement.scrollTop < headerHeight
        ? `${sidebarHeight + document.documentElement.scrollTop}px`
        : `${sidebarHeight}px`
  }

  window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`).matches &&
    window.addEventListener("scroll", onScroll, true)
  return () => {
    window.removeEventListener("scroll", onScroll, true)
  }
}

const PostLayout = ({ data: { mdx, site } }) => {
  const sidebarRef = React.useRef(null)
  const headerRef = React.useRef(null)
  const postUrl = `${site.siteMetadata.siteUrl}${
    mdx.frontmatter.slug ? `/posts${mdx.frontmatter.slug}` : mdx.fields.slug
  }`
  const sharerIntents = [
    {
      name: "twitter",
      text: `${mdx.frontmatter.desc}\n${postUrl}`,
    },
    {
      name: "facebook",
      text: postUrl,
    },
    {
      name: "linkedin",
      text: `url=${postUrl}&summary=${mdx.frontmatter.desc}`,
      url: true
    },
  ]

  React.useEffect(() => {
    return updateSidebarHeight(headerRef.current, sidebarRef.current)
  }, [headerRef, sidebarRef])
  console.log(mdx.frontmatter.featuredImage.childImageSharp.fluid.src)
  return (
    <>
      <ComponentScopedGlobalStyle />
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.desc}
        keywords={mdx.frontmatter.tags}
        meta={[
          {
            name: "author",
            content: `${mdx.frontmatter.author}`,
          },
          {
            name: "twitter:site",
            content: `${mdx.frontmatter.author_twitter}`,
          },
        ]}
        image={mdx.frontmatter.featuredImage.childImageSharp.fluid.src}
      />
      <Header
        siteTitle={site.siteMetadata.title}
        active={mdx.frontmatter.tags.includes(`featured`) ? 2 : 0}
        ref={headerRef}
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
          ref={sidebarRef}
        >
          <AllPosts related to={mdx.frontmatter.tags} exclude={mdx.id} />
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
              <IntentShare
                className="p-3 px-md-5 pt-md-5 pb-md-3"
                intents={sharerIntents}
              />

              <main className="post p-3 px-md-5" role="main">
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
            <Tags tags={mdx.frontmatter.tags} className="px-3 px-md-5" />
            <div className="d-xl-flex p-3 p-md-5">
              <AuthorDetails author={mdx.frontmatter.author} />
            </div>
            <NWSForm className="px-xl-5 mt-3 mt-xl-0" />
          </div>

          <Footer />
        </PostContent>
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
        author_twitter
        date(formatString: "MMM DD, YYYY")
        last_modified(formatString: "MMM DD, YYYY")
        desc
        tags
        slug
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
      timeToRead
      tableOfContents
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`

export default PostLayout
