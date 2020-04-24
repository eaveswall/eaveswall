import React from "react"
import PropTypes from "prop-types"

import StyledSidebar, {
  StyledSidebarHeader,
  StyledSidebarMain,
} from "./sidebar"

const Sidebar = ({ children, title, className = "", width, ...rest }) => (
  <StyledSidebar className={className} style={{ width: `${width}` }} {...rest}>
    <StyledSidebarHeader>
      <h3 style={{ margin: 0 }}>{title}</h3>
    </StyledSidebarHeader>
    <StyledSidebarMain tabIndex={-1}>{children}</StyledSidebarMain>
  </StyledSidebar>
)

Sidebar.propTypes = {
  shrink: PropTypes.number,
  width: PropTypes.string,
  title: PropTypes.string,
}

export default Sidebar
