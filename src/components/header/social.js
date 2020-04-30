import React from "react"

import { StyledNavButton } from "./header"
import InstagramSVG from "../../images/svg/instagram.inline.svg"
import TwitterSVG from "../../images/svg/twitter-circle.inline.svg"

const socialLinks = [
  {
    hyperlink: "https://twitter.com/eaveswall",
    Icon: TwitterSVG,
    text: "Twitter"
  },
  {
    hyperlink: "https://instagram.com/eaveswall_",
    Icon: InstagramSVG,
    text: "Instagram"
  },
]

const Social = ({ className, ...rest }) => {
  return (
    <div className={className} {...rest}>
      {socialLinks.map(({ hyperlink, Icon, text }, index) => {
        return (
          <StyledNavButton
            as="a"
            href={hyperlink}
            target="_blank"
            rel="noreferrer noopener"
            style={{ padding: `0.5rem` }}
            key={index}
          >
            <span className="mx-0" style={{ fill: `rgba(255, 255, 255, .5)` }}>
              <Icon
                width="30"
                height="30"
                className="icon"
                presentation="true"
              />
              <span className="sr-only">{text}</span>
            </span>
          </StyledNavButton>
        )
      })}
    </div>
  )
}

export default Social
