import React from "react"
import PropTypes from "prop-types"

import "./sidebar.mod.scss"

const Sidebar = ({ children, title, className = "", width, ...rest }) => (
  <aside
    className={className}
    styleName="sidebar"
    style={{ width: `${width}` }}
    {...rest}
  >
    <div styleName="sidebar-header">
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
    <div styleName="aside-main">{children}</div>
  </aside>
)

Sidebar.propTypes = {
  shrink: PropTypes.number,
  width: PropTypes.string,
  title: PropTypes.string,
}

export default Sidebar
