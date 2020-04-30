import React from "react"
import {
  StyledFooter,
  StyledFooterSocial,
  StyledFooterLink,
  StyledFooterGroup,
  StyledFooterGroupItem,
} from "./footer"
import TwitterSVG from "../../images/svg/twitter.inline.svg"
import InstagramSVG from "../../images/svg/instagram.inline.svg"
import { StyledNavButton } from "../header/header"
import { ThemeContext } from "styled-components"

const footerLinks = [
  {
    Social: [
      {
        link: "https://twitter.com/eaveswall",
        Icon: TwitterSVG,
        text: "Twitter",
      },
      {
        link: "https://instagram.com/eaveswall_",
        Icon: InstagramSVG,
        text: "Instagram",
      },
    ],
  },
  {
    Details: [
      {
        link: "/about/",
        text: "About",
      },
      {
        link: "mailto:team@eaveswall.com",
        text: "Contact",
        generic: true,
      },
    ],
    Services: [
      {
        link: "/advertise/",
        text: "Advertise",
      },
      {
        link: "/posts/featured/",
        text: "Featured",
      },
    ],
  },
]

const FooterSocial = () => {
  const theme = React.useContext(ThemeContext)
  return (
    <>
      <StyledFooterSocial>Social</StyledFooterSocial>
      <div className="d-flex">
        {footerLinks[0].Social.map(({ link, Icon, text }, index) => {
          return (
            <React.Fragment key={index}>
              <StyledNavButton
                as="a"
                href={link}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon
                  width="48"
                  height="48"
                  className="icon"
                  presentation="true"
                  style={{ fill: theme.main.fgFair }}
                />
                <span className="sr-only">{text}</span>
              </StyledNavButton>
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

const FooterNav = () => {
  const targetLinks = footerLinks[1]
  const groups = Object.keys(targetLinks)
  return (
    <>
      {groups.map((group, index) => {
        return (
          <StyledFooterGroup style={{ margin: `0 2rem` }} key={index}>
            <StyledFooterGroupItem style={{ fontSize: `1.3rem` }}>
              {group}
            </StyledFooterGroupItem>
            <StyledFooterGroupItem>
              <StyledFooterGroup>
                {targetLinks[group].map(({ link, text, generic }, idx) => {
                  return (
                    <StyledFooterGroupItem key={++index * idx}>
                      <StyledFooterLink
                        {...(generic ? { as: "a", href: link } : { to: link })}
                      >
                        {text}
                      </StyledFooterLink>
                    </StyledFooterGroupItem>
                  )
                })}
              </StyledFooterGroup>
            </StyledFooterGroupItem>
          </StyledFooterGroup>
        )
      })}
    </>
  )
}

const Footer = ({ children, className, ...rest }) => {
  return (
    <StyledFooter className="d-flex px-xl-5 py-4">
      <div>
        Eaveswall brought to you with all the love in the world and outside it
        <div>
          Copyright &copy; {new Date().getFullYear()} Eaveswall. All rights
          reserved
        </div>
        <FooterSocial />
      </div>
      <div className="d-flex flex-column flex-sm-row mx-4">
        <FooterNav />
      </div>
    </StyledFooter>
  )
}

export default Footer
