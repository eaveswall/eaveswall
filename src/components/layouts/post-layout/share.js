import React from "react"
import styled from "styled-components"

import Twitter from "../../../images/svg/twitter.inline.svg"
import Facebook from "../../../images/svg/facebook.inline.svg"
import LinkedIn from "../../../images/svg/linkedin.inline.svg"
import Share from "../../../images/svg/share.inline.svg"

const StyledShare = styled.a`
  background-color: ${({ theme: { themeColorAlt } }) => themeColorAlt};
  ${'' /* background: rgb(184, 11, 44, 0.8); */}
  color: #ffffff;
  border-radius: 50%;
  padding: 0.55rem 0.3rem;
  margin-right: 1rem;
  &:hover {
    background-color: ${({ theme: { themeColor } }) => themeColor};
    color: #ffffff;
    transition: all linear 0.6s;
  }
`

const allMedia = {
  twitter: {
    link: "https://twitter.com/intent/tweet?text=",
    Icon: Twitter,
  },
  facebook: {
    link: "https://facebook.com/sharer/sharer.php?u=",
    Icon: Facebook,
  },
  linkedin: {
    link: "https://www.linkedin.com/shareArticle?mini=false&",
    Icon: LinkedIn,
  },
}

const IntentShare = ({ intents, className, ...rest }) => {
  return (
    <div className={`d-flex align-items-center ${className}`} {...rest}>
      <Share
        width="22"
        height="22"
        presentation="true"
        style={{ fill: `currentColor` }}
      />
      <div className="ml-3">
        {intents &&
          intents.map(({ name, text, url }) => {
            const Icon = allMedia[name].Icon
            return (
              <StyledShare
                href={`${allMedia[name].link}${!url ? encodeURIComponent(text) : text}`}
                rel="noreferrer noopener nofollow"
                key={`${name}-share-button`}
              >
                <span className="sr-only">Share on {name}</span>
                <Icon
                  width="24"
                  height="24"
                  presentation="true"
                  style={{ fill: `currentColor` }}
                />
              </StyledShare>
            )
          })}
      </div>
    </div>
  )
}

export default IntentShare
