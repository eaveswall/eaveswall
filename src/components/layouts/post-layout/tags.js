import React from "react"
import styled from "styled-components"
import TagsInline from "../../../images/svg/tags.inline.svg"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

export const StyledTagLinks = styled(Link)`
  background-color: ${({ theme: { main } }) => main.bgFair};
  border: 1px solid ${({ theme: { main } }) => main.shade};
  color: ${({ theme }) =>
    theme.main.day ? theme.primaryLight : theme.secondary};
  padding: 1px 0.5rem;
  border-radius: 50px;
  margin: auto 0.2rem;
  &:hover {
    color: ${({ theme }) => (theme.main.day ? theme.primary : theme.secondary)};
    background: ${({ theme: { main } }) => main.bg};
    text-decoration: none;
  }
`
const StyledTagsIcon = styled.div`
  border-radius: 50%;
  background-color: ${({ theme: { main } }) => main.bgFair};
  border: 1px solid ${({ theme: { main } }) => main.shade};
  display: inline;
  padding: 0.4rem;
  position: relative;
  &:before {
    content: "";
    height: 65px;
    width: 2px;
    display: block;
    position: absolute;
    top: -65px;
    left: 50%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${({ theme: { main } }) => main.shade} 100%
    );
  }
`

const Tags = ({ tags, ...rest }) => {
  return (
    <div {...rest}>
      <div className="d-flex">
        <StyledTagsIcon className="align-self-start">
          <TagsInline
            width="22"
            height="22"
            presentation="true"
            style={{ fill: `currentColor` }}
          />
          <span className="sr-only">Tags:</span>
        </StyledTagsIcon>
        <div className="d-inline-flex flex-wrap ml-3">
          {tags.map(tag => {
            return (
              <StyledTagLinks className="mb-2" to={`/tags/${kebabCase(tag)}/`} key={tag}>
                {tag}
              </StyledTagLinks>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tags
