import React from "react"
import PropTypes from "prop-types"

import StyledCard, {
  StyledCardMeta,
  StyledCardImage,
  StyledCardContent,
} from "./card"

const Card = ({ image, title, mute, content }) => (
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
          <strong>{mute}</strong>
        </small>
      </div>
    </StyledCardMeta>
    <StyledCardContent>
      <div className="content p-3">{content}</div>
    </StyledCardContent>
  </StyledCard>
)

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  mute: PropTypes.string,
}

export default Card
