import React from "react"
import styled from "styled-components"

const StyledPostContent = styled.div`
  min-height: 100%;
  width: 100%;
`

const PostContent = ({ children }) => (
  <StyledPostContent className="d-flex flex-column flex-shrink-1">
    {children}
  </StyledPostContent>
)

export default PostContent
