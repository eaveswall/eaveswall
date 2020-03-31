import React from "react"
import PropTypes from "prop-types"

import "./card.mod.scss"

const Card = ({ image, title, mute, content }) => (
  <div styleName="card">
    <div styleName="card-meta">
      <div
        styleName="card-image"
        style={{
          position: `relative`,
          backgroundImage: `url(${image.src}),
            url(${image.base64})`,
        }}
      ></div>
      <div className="px-3 py-2">
        <h6 className="text-truncate" style={{ margin: 0, fontWeight: 900}}>
          {title}
        </h6>
        <small className="text-muted">
          <strong>{mute}</strong>
        </small>
      </div>
    </div>
    <div styleName="card-content">
      <div className="p-3" styleName="content">
        {content}
      </div>
    </div>
  </div>
)

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
}

export default Card
