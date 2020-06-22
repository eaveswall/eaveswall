import React from "react"
import {
  StyledFooter,
  StyledFooterHeading,
  StyledFooterLink,
  StyledFooterGroup,
  StyledFooterGroupItem,
} from "./footer"
import TwitterSVG from "../../images/svg/twitter.inline.svg"
import InstagramSVG from "../../images/svg/instagram.inline.svg"
import WhatsappSVG from "../../images/svg/whatsapp.inline.svg"
import { StyledNavButton } from "../header/header"
import { ThemeContext } from "styled-components"
import PropTypes from "prop-types"

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
      {
        link: "https://wa.me/2348121594054",
        Icon: WhatsappSVG,
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
        link: "/promotions/",
        text: "Advertise",
      },
      {
        link: "/posts/featured/",
        text: "Featured",
      },
    ],
    Explore: [
      {
        link: "/tags/",
        text: "Tags",
      },
      {
        link: "/authors/",
        text: "Authors",
      },
    ],
  },
]

const FooterSocial = () => {
  const theme = React.useContext(ThemeContext)
  return (
    <>
      <StyledFooterHeading>Social Profiles & Media</StyledFooterHeading>
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
                  width="40"
                  height="40"
                  className="icon"
                  presentation="true"
                  style={{ fill: theme.main.day ? theme.themeColorAlt : theme.main.fgFair }}
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
      {groups.map(group => {
        return (
          <StyledFooterGroup className="mr-auto mr-lg-3 mx-xl-2" key={group}>
            <StyledFooterGroupItem style={{ fontSize: `0.9rem` }}>
              {group.toUpperCase()}
            </StyledFooterGroupItem>
            <StyledFooterGroupItem>
              <StyledFooterGroup>
                {targetLinks[group].map(({ link, text, generic }) => {
                  return (
                    <StyledFooterGroupItem key={text}>
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

const Footer = ({ withCredits }) => {
  return (
    <StyledFooter className="d-flex flex-column flex-lg-row px-xl-5 py-4">
      <div
        className="d-flex flex-column-reverse flex-lg-row"
        style={{ minWidth: `55%` }}
      >
        <div>
          Eaveswall brought to you with all the <span role="img" aria-label="love">💖</span> in the world and outside it
          <div>
            Copyright &copy; {new Date().getFullYear()} Eaveswall. All rights
            reserved
          </div>
          <FooterSocial />
        </div>
        <div className="d-flex flex-row flex-wrapx mx-0 mx-lg-3">
          <FooterNav />
        </div>
      </div>

      {withCredits && (
        <div>
          <StyledFooterHeading style={{ marginTop: 0 }}>
            Images Credit & Attribution
          </StyledFooterHeading>
          <div className="mt-3">
            Thanks to our folks at{" "}
            <StyledFooterLink
              as="a"
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Unsplash
            </StyledFooterLink>{" "}
            , a large community of professional photographers who make cool
            awesome photos available for free.
            {/* <div>
              Majority of our images are from this great community and we are
              grateful.
            </div> */}
          </div>
        </div>
      )}
    </StyledFooter>
  )
}

Footer.propTypes = {
  withCredits: PropTypes.bool,
}

export default Footer
