import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import Card from "../cards"


const PostCard = ({ node }) => (
  <div className="mx-auto my-4">
    <Link
      to={node.fields.slug}
      style={{ textDecoration: `none`, display: `contents` }}
    >
      <Card
        title={node.frontmatter.title}
        mute={`${node.frontmatter.author} — ${node.parent.birthTime}`}
        content={node.excerpt}
        image={node.frontmatter.featuredImage.childImageSharp.fluid}
      />
    </Link>
  </div>
)

PostCard.propTypes = {
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
}

export default PostCard
