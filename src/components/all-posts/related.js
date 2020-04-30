import React from "react"
import PropTypes from "prop-types"
import PostCard from "./postcard"

const relationshipCount = (xlist, ylist) => {
  let count = 0
  xlist.forEach(xvalue => {
    if (ylist.includes(xvalue)) count++
  })
  return count
}

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

Related.propTypes = {
  data: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          fields: PropTypes.shape({ slug: PropTypes.string }),
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            author: PropTypes.string,
            tags: PropTypes.string,
            featuredImage: PropTypes.shape({
              childImageSharp: PropTypes.shape({ fluid: PropTypes.object }),
            }),
            excerpt: PropTypes.string,
          }),
        }),
      })
    ),
  }),
  tags: PropTypes.arrayOf(PropTypes.string),
  exclude: PropTypes.string,
}

export default Related
