import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "./front-tile-img.mod.scss"

const FrontTile = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "silence.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      placeholderImage2: file(relativePath: { eq: "front-tiles-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      placeholderImage3: file(relativePath: { eq: "gossip.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      placeholderImage4: file(relativePath: { eq: "color-sidewalk.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const tile = [
    data.placeholderImage,
    data.placeholderImage2,
    data.placeholderImage3,
    data.placeholderImage4,
  ]

  return (
    <>
      <div
        className="d-none d-xl-flex flex-row-reverse"
        style={{ height: `100vh`, overflow: `hidden` }}
      >
        <div
          className="d-none d-md-flex flex-shrink-0"
          style={{ width: `60vw`, height: `100vh`, overflow: `hidden`, clipPath: `polygon(0 0, 100% 0, 100% 100%, 10% 100%)` }}
        >
          {tile.map(({ childImageSharp: { fluid } }, index) => {
            return (
              <Img
                fluid={fluid}
                fadeIn={true}
                durationFadeIn={2000}
                styleName="tile-img"
                key={index}
              />
            )
          })}
        </div>
        {children}
      </div>
      <div
        style={{
          width: `60vw`,
          height: `100vh`,
          position: `absolute`,
          top: 0,
          right: 0,
        }}
      ></div>
    </>
  )
}

export default FrontTile
