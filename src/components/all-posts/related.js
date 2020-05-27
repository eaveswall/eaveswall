import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
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
    <span>Yikes! I'm surprised there are no related posts.</span>
  </div>
)

const useRank = ({ tags, data, exclude }, deps) => {
  const calculateRank = () => {
    const priorityQueue = [] // queue a descent ordered list of relationship rank
    const relationshipRank = {} // associate each rank with a node using key value pair structure

    data.edges.forEach(({ node }) => {
      // we'd want to exclude the post that queried for related posts when we come across it in an edge
      if (node.id === exclude) return
      const rc = relationshipCount(tags, node.frontmatter.tags) // factor relationship based on similar tags
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
    return { priorityQueue, relationshipRank }
  }
  return useMemo(calculateRank, deps)
}

const Related = ({ tags, exclude }) => {
  const { data } = useStaticQuery(
    graphql`
      query {
        data: allMdx(
          sort: { fields: frontmatter___date, order: DESC }
          limit: 100
          filter: { frontmatter: { publish: { eq: true } } }
        ) {
          ...AllMdxFrag
        }
      }
    `
  )

  const { priorityQueue, relationshipRank } = useRank({ tags, data, exclude }, [
    tags,
    data,
    exclude,
  ])

  // if no relationship found by not having tags common to other posts
  if (!Object.keys(relationshipRank).length) return <NoRelatedPosts />

  priorityQueue.sort((a, b) => b - a)
  return priorityQueue.slice(0, 5).map(value => {
    const node = relationshipRank[value]
    if (node instanceof Array) {
      return node.map(nodeListElement => (
        <PostCard key={nodeListElement.id} node={nodeListElement} />
      ))
    }
    return <PostCard key={node.id} node={node} />
  })
}

Related.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  exclude: PropTypes.string,
}

export default Related
