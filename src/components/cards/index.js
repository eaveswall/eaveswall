import React from "react"
import PropTypes from "prop-types"

import StyledCard, {
  StyledCardMeta,
  StyledCardImage,
  StyledCardContent,
} from "./card"

const Card = ({ image, title, mute, content }) => {
  const maxAuthorNameLength = 15
  let [author, date] = mute.split(/\u2014/, 2)
  author = author.trim()

  if (author.length > maxAuthorNameLength) {
    author = author.substring(0, maxAuthorNameLength) + '...'
  }

  return (
    <StyledCard>
      <StyledCardMeta>
        <StyledCardImage
          style={{
            position: `relative`,
            backgroundImage: `url(${image.src}),
            url(${image.base64})`,
          }}
        />
        <div className="px-3 py-2">
          <h6 className="text-truncate" style={{ margin: 0, fontWeight: 900 }}>
            {title}
          </h6>
          <small className="text-muted">
            <strong>{author} &mdash; {date}</strong>
          </small>
        </div>
      </StyledCardMeta>
      <StyledCardContent>
        <div className="content p-3">{content}</div>
      </StyledCardContent>
    </StyledCard>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  mute: PropTypes.string,
}

export default Card
