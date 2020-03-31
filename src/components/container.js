import React from "react"
import PropTypes from "prop-types"

const Container = ({ children, fluid }) => (
  <div className={fluid ? "container-fluid" : "container"}>{children}</div>
)

Container.defaultProps = {
  fluid: false,
}

Container.propTypes = {
  fluid: PropTypes.bool,
}

export default Container
