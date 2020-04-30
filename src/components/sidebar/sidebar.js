import styled from "styled-components"

const StyledSidebar = styled.aside`
  width: auto;
  max-height: calc(100vh - 60px);
  padding: 0;
  overflow-y: hidden;
  background-color: ${({ theme: { main } }) => main.bgAlt};
  @supports (position: sticky) {
    position: sticky;
    top: 47px;
  }
`

const StyledSidebarHeader = styled.div`
  background-color: ${({ theme: { main } }) => main.bg};
  box-shadow: 0 5px 15px ${({ theme: { main } }) => main.shade};
  color: ${({ theme: { main } }) => main.fg};
  width: 100%;
  padding: 0.6em 1em;
  @supports (position: sticky) {
    position: sticky;
    top: -46.38px;
    z-index: 10;
  }
`

const StyledSidebarMain = styled.div`
  padding: 2em 1em;
  overflow-y: auto;
  height: 95%;
  & > div {
    margin: auto;
  }
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 10px !important;
  }
  &::-webkit-scrollbar-button {
    visibility: hidden !important;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a5a5a5 !important;
    border-radius: 50px !important;
  }
`

export { StyledSidebarHeader, StyledSidebarMain }
export default StyledSidebar
