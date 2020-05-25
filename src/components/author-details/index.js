import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { SIZES, BREAKPOINTS } from "../theme"

// import AuthorHighlight from "../../images/svg/author-highlight.inline.svg"

const AuthorContainer = styled.div`
  background-color: ${({ theme: { main } }) => main.bg};
  box-shadow: 0px 10px 16px ${({ theme: { main } }) => main.shade};
  border-radius: 7px;
  width: 100%;
  @media (min-width: ${BREAKPOINTS.xl}px) {
    width: calc(100% - ${SIZES.tocWidth});
  }
`

const AuthorSubConatainer = styled.div`
  padding: 1rem;
  &:first-of-type {
    border-bottom: ${({theme: {borderWidth}}) => borderWidth} solid ${({theme: {main}}) => main.shade};
  }
`

const AuthorImage = styled.div`
  border-radius: 50%;
  ${'' /* border: 2px solid ${({ theme: { main } }) => main.bgAlt};
  box-shadow: 0 0 0 0.15rem
    ${({ theme: { main, primary, secondary } }) =>
      main.day ? primary : secondary}; */}
  position: relative;
  width: 48px;
  height: 48px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
`

const Author = styled.h5`
  display: inline-block;
  margin: 0 0 0 1rem;
  color: ${({ theme: { primary } }) => primary};
  background-image: linear-gradient(
    to right,
    ${({ theme: { main, primary, secondary } }) =>
      main.day ? primary : secondary},
    ${({ theme: { main, primaryLight, secondaryLight } }) =>
      main.day ? primaryLight : secondaryLight}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const AuthorBio = styled.div`
  font-weight: 600;
  color: ${({ theme: { primary } }) => primary};
  background-image: linear-gradient(
    to right,
    ${({ theme: { main, primary, secondary } }) =>
      main.day ? primary : secondary},
    ${({ theme: { main, primaryLight, secondaryLight } }) =>
      main.day ? primaryLight : secondaryLight}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const AuthorDetails = ({ author }) => {
  const { allAuthorsJson: authors } = useStaticQuery(
    graphql`
      query Authors {
        allAuthorsJson {
          edges {
            node {
              id
              name
              bio
              image {
                childImageSharp {
                  fluid(maxWidth: 64) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  const { node: authorDetails } = authors.edges.find(
    ({ node: { name } }) => name === author
  )
  return (
    <AuthorContainer>
      <AuthorSubConatainer>
        <div style={{ position: `relative`, display: `inline-block` }}>
          <AuthorImage>
            <Img
              fluid={authorDetails.image.childImageSharp.fluid}
              draggable={false}
            />
          </AuthorImage>
          {/* <AuthorHighlight
            width="82"
            height="62"
            style={{ position: `absolute`, top: `12.5px`, left: `-17px` }}
          /> */}
        </div>

        <Author>{authorDetails.name}</Author>
      </AuthorSubConatainer>
      <AuthorSubConatainer>
        <AuthorBio><span dangerouslySetInnerHTML={{__html: authorDetails.bio}} /></AuthorBio>
      </AuthorSubConatainer>
    </AuthorContainer>
  )
}

export default AuthorDetails
