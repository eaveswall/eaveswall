import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import EaveswallIcon from "../../images/svg/eaveswall-icon.inline.svg"
import MenuIcon from "../../images/svg/menu.inline.svg"
import StyledHeader, {
  StyledHeaderGroup,
  StyledNavlink,
  StyledNavContainer,
  StyledNavButton,
} from "./header"
import Social from "./social"
import ThemeSwitch from "./theme-switch"
import Divider from "../divider"

const headerLinks = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Featured",
    link: "/posts/featured/",
  },
  {
    text: "Advertise",
    link: "/advertise",
  },
  {
    text: "About",
    link: "/about",
  },
]
const contact = "mailto:team@eaveswall.com"

const handleNav = ({ navState: { isOpen }, setNavState }) => {
  if (isOpen) setNavState({ isOpen: false, style: null })
  else
    setNavState({
      isOpen: true,
      style: {
        maxHeight: `300px`,
        visibility: `visible`,
        opacity: 1,
      },
    })
}

const Header = ({ siteTitle, active, shade }) => {
  const [navState, setNavState] = useState({ isOpen: false, style: null })
  return (
    <StyledHeader {...(shade ? { isHome: true } : null)}>
      <StyledHeaderGroup className="px-3 py-2" role="banner">
        <div>
          <EaveswallIcon width="35" height="35" />
          <span>
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </span>
        </div>
      </StyledHeaderGroup>
      <StyledHeaderGroup
        className="d-flex flex-column"
        role="navigation"
        style={shade ? { boxShadow: `0 5px 7px rgba(0,0,0,.1)` } : null}
      >
        <div className="d-flex d-md-block px-2">
          <StyledNavButton
            className="d-md-none"
            onClick={handleNav.bind(null, { navState, setNavState })}
          >
            <MenuIcon
              width="30"
              height="30"
              style={{ fill: `white` }}
              className="icon"
              presentation="true"
            />
            <span className="sr-only">Menu</span>
          </StyledNavButton>
          <ThemeSwitch className="d-md-none ml-auto" />
        </div>
        <StyledNavContainer
          className="d-flex flex-column flex-md-row flex-grow-1"
          style={navState.style}
        >
          {headerLinks.map(({ text, link }, index) => {
            return (
              <StyledNavlink
                to={link}
                className={`${active === ++index ? "active" : ""}`}
                key={index}
                style={navState.isOpen ? { marginTop: 0 } : null}
              >
                {text}
              </StyledNavlink>
            )
          })}
          <StyledNavlink
            as="a"
            href={contact}
            style={navState.isOpen ? { marginTop: 0 } : null}
          >
            Contact
          </StyledNavlink>
          <div className="d-flex ml-0 ml-md-auto">
            <ThemeSwitch className="d-none d-md-block" />
            <Divider width="5px" height="100%" vertical />
            <Social className="ml-auto" />
          </div>
        </StyledNavContainer>
      </StyledHeaderGroup>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  shade: PropTypes.bool,
  active: PropTypes.number,
}

Header.defaultProps = {
  siteTitle: ``,
  shade: false,
  active: 1,
}

export default Header
