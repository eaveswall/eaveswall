import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import Card from "../components/cards"

export const allMdxFragment = graphql`
  fragment AllMdxFrag on MdxConnection {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          author
          tags
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        excerpt(pruneLength: 70)
      }
    }
  }
`

const PostCard = ({ node }) => (
  <div className="mx-auto my-4">
    <Link
      to={node.fields.slug}
      style={{ textDecoration: `none`, display: `contents` }}
    >
      <Card
        title={node.frontmatter.title}
        mute={node.frontmatter.author}
        content={node.excerpt}
        image={node.frontmatter.featuredImage.childImageSharp.fluid}
      />
    </Link>
  </div>
)

const NoRelatedPosts = () => (
  <div
    style={{
      fontSize: `1.5rem`,
      fontWeight: `500`,
      textAlign: `center`,
      margin: `auto`,
    }}
  >
    <span> I'm surprised there are no related posts.</span>
  </div>
)

const relationshipCount = (xlist, ylist) => {
  let count = 0
  xlist.forEach(xvalue => {
    if (ylist.includes(xvalue)) count++
  })
  return count
}

const resolveAllMdx = allMdx => {
  allMdx.edges.reverse()
}

const Related = ({ data, tags, exclude }) => {
  const priorityQueue = [] // queue a descent ordered list of relationship rank
  const relationshipRank = {} // associate each rank with a node using key value pair structure

  data.edges.forEach(({ node }) => {
    if (node.id === exclude) return // we'd want to exclude the post that queried for related posts when we come across it in an edge
    const rc = relationshipCount(tags, node.frontmatter.tags.split(`,`)) // factor relationship based on similar tags
    if (rc) {
      if (priorityQueue.includes(rc)) {
        // when relationship becomes ambiguous, make a list for all ambiguously related posts
        return relationshipRank[rc] instanceof Array
          ? relationshipRank.push(node)
          : (relationshipRank[rc] = [relationshipRank[rc]]).push(node)
      }
      priorityQueue.push(rc)
      relationshipRank[rc] = node
    }
  })
  // if no relationship found by not having tags common to other posts
  if (!Object.keys(relationshipRank).length) return <NoRelatedPosts />
  priorityQueue.sort(() => -1)
  return priorityQueue.map((value, index) => {
    const node = relationshipRank[value]
    if (node instanceof Array) {
      return node.map((nodeListElement, idx) => (
        <PostCard key={idx} node={nodeListElement} />
      ))
    }
    return <PostCard key={index} node={node} />
  })
}

const AllPosts = ({ related = false, to = [], exclude = "" }) => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx {
          ...AllMdxFrag
        }
      }
    `
  )
  resolveAllMdx(allMdx)
  if (related) return <Related data={allMdx} tags={to} exclude={exclude} />
  return allMdx.edges.map(({ node }, index) => {
    console.log(node.fields.slug)
    return <PostCard key={index} node={node} />
  })
}

AllPosts.propTypes = {
  related: PropTypes.bool,
  to: PropTypes.arrayOf(PropTypes.string),
  exclude: PropTypes.string,
}

export default AllPosts
