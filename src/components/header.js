import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.mod.scss"
import { useState } from "react"

import EaveswallIcon from "../images/svg/eaveswall-icon.inline.svg"
import MenuIcon from "../images/svg/menu.inline.svg"
import InstagramSVG from "../images/svg/instagram.inline.svg"
import TwitterSVG from "../images/svg/twitter-circle.inline.svg"

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
const contact = "mailto:contact@eaveswall.com"
const socialLinks = {
  twitter: "https://twitter.com/eaveswall",
  instagram: "https://instagram.com/eaveswall",
}

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
    <header styleName="header" style={shade ? { top: `0.0px` } : {}}>
      <div className="px-3 py-2" styleName="heads" role="banner">
        <div>
          <EaveswallIcon width="35" height="35" />
          <span>
            <Link
              to="/"
              style={{
                color: `black`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </span>
        </div>
      </div>
      <div
        className="d-flex flex-column"
        styleName="heads"
        role="navigation"
        style={shade ? { boxShadow: `0 5px 7px rgba(0,0,0,.1)` } : {}}
      >
        <div className="px-2">
          <button
            className="d-md-none"
            style={{
              padding: `10px`,
              borderRadius: `50%`,
              border: 0,
              outline: 0,
              backgroundColor: `transparent`,
              color: `white`,
            }}
            onClick={handleNav.bind(null, { navState, setNavState })}
          >
            <MenuIcon width="30" height="30" style={{fill: `white`}} />
          </button>
        </div>
        <div
          className="d-flex flex-column flex-md-row flex-grow-1"
          styleName="nav-container"
          style={navState.style}
        >
          {headerLinks.map(({ text, link }, index) => {
            return (
              <Link
                to={link}
                styleName={`nav-link ${active === ++index ? "active" : ""}`}
                key={index}
                style={navState.isOpen ? { marginTop: 0 } : null}
              >
                {text}
              </Link>
            )
          })}
          <a
            href={contact}
            styleName="nav-link"
            style={navState.isOpen ? { marginTop: 0 } : null}
          >
            Contact
          </a>
          <div className="ml-auto p-2">
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span
                className="mx-2"
                style={{ fill: `rgba(255, 255, 255, .5)` }}
              >
                <TwitterSVG width="30" height="30" />
              </span>
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span
                className="mx-2"
                style={{ fill: `rgba(255, 255, 255, .5)` }}
              >
                <InstagramSVG width="30" height="30" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
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
