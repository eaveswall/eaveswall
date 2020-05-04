import React from "react"
import { Link } from "gatsby"
import { StyledHeaderGroup } from "./header"
import EaveswallIcon from "../../images/svg/eaveswall-icon.inline.svg"

export const Banner = ({ title, subtitle }) => {
  return (
    <StyledHeaderGroup className="px-3 py-2" role="banner">
      <div>
        <EaveswallIcon width="35" height="35" />
        <span style={{ fontFamily: `Satisfy` }}>
          <Link
            to="/"
            style={{
              textDecoration: `none`,
            }}
          >
            {title}
          </Link>
          <span className="text-muted"> | {subtitle}</span>
        </span>
      </div>
    </StyledHeaderGroup>
  )
}
