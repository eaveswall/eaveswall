import { createGlobalStyle } from "styled-components"
import { L_BREAKPOINTS } from "../../theme"


const ComponentScopedGlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme: { main } }) => main.bg};
    color: ${({ theme: { main } }) => main.fg};
  }
  twitter-widget {
    @media (max-width: ${L_BREAKPOINTS.lsm}px) {
      width: calc(100vw - 2rem) !important;
    }
    margin: auto !important;
    overflow-x: auto;
  }
  main.post {
    background-color: ${({ theme: { main } }) => main.bg};
    color: ${({ theme: { main } }) => main.fgAlt};
    h2, h3, h4, a {
      color: ${({ theme: { main } }) => main.fg};
    }
    a:not([class*=button]) {
      text-decoration: underline;
      &:hover {
        color: ${({ theme }) =>
        theme.main.day ? theme.primaryLight : theme.secondary};
        text-decoration: underline;
      }
    }
    h2, h3, h4 {
      a.anchor.before {
        text-decoration: none;
        svg {
          display: none;
        }
      }
    }
    img,
    span.gatsby-resp-image-background-image {
      border-radius: 20px;
      margin: 2rem 0;
    }
    blockquote:not([class]) {
      position: relative;
      color: ${({ theme: { main } }) => main.fg};
      padding: 1rem;
      border-width: 2px;
      border-style: solid;
      border-color: ${({ theme }) =>
        theme.main.day ? theme.primaryLight : theme.secondary};
      border-radius: 10px;
      p:last-of-type {
        margin: 0;
      }
      &:after,
      &:before {
        color: ${({ theme }) =>
        theme.main.day ? theme.primaryLight : theme.secondary};
        display: block;
        font-size: 3rem;
        font-family: sans-serif;
        position: absolute;
        text-shadow: 3px 3px 0 ${({ theme }) =>
        theme.main.bg}, -3px 3px 0 ${({ theme }) =>
        theme.main.bg};
        height: 0px;
      }
      &:before {
        content: '\u201f';
        top: -1.5rem;
        left: 1rem;
      }
      &:after {
        content: '\u201d';
        bottom: 1.4rem;
        right: 1rem;
      }
    }
  }
`

export default ComponentScopedGlobalStyle
