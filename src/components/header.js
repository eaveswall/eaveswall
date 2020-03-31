import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.mod.scss"
import { useState } from "react"

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
    <header styleName="header" style={shade ? { top: `0px` } : {}}>
      <div className="px-3 py-3" styleName="heads" role="banner">
        <h1
          style={{
            maxWidth: `860px`,
            margin: `0 auto`,
          }}
        >
          <Link
            to="/"
            style={{
              color: `black`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div
        className="d-flex flex-column"
        styleName="heads"
        role="navigation"
        style={shade ? { boxShadow: `0 5px 10px rgba(0,0,0,.4)` } : {}}
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
            ||||
          </button>
        </div>
        <div
          className="d-flex flex-column flex-md-row"
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
