import { Link } from "gatsby"
import React from "react"

import "./footer.mod.scss"

const Footer = () => (
  <footer styleName="footer">
    <div style={{ maxWidth: `860px`, margin: `auto` }}>
      Eaveswall brought to you by <Link to="/authors/john">@john</Link> &amp;{" "}
      <Link to="/authors/calebpitan">@calebpitan</Link>
      <div>Copyright &copy; {new Date().getFullYear()} Eaveswall</div>
      <ul className="d-flex" styleName="unstyle">
        <li className="mr-auto">
          <Link to="/about">About</Link>
        </li>
        <li className="m-auto">
          <a href="mailto:connect@eaveswall.com">Contact</a>
        </li>
        <li className="m-auto">
          <a href="mailto:ads@eaveswall.com">Advertise</a>
        </li>
        <li className="m-auto">
          <a
            href="https://twitter.com/eaveswall"
            target="_blank"
            rel="noreferrer noopener"
          >
            Twitter
          </a>
        </li>
        <li className="m-auto">
          <a
            href="https://instragram.com/eaveswall"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instagram
          </a>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer
