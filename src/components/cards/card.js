import styled from "styled-components"

const BORDER_RADIUS = `15px`
const BORDER_WIDTH = `1px`
const FONT_SIZE_SM = `.85rem`

const StyledCardMeta = styled.div`
  width: 18rem;
  max-width: 21rem;
  background-color: ${({ theme: { main } }) => main.bg};
  color: ${({ theme: { main } }) => main.fg};
  border-radius: ${BORDER_RADIUS};
  display: block;
  overflow: hidden;
  border: ${BORDER_WIDTH} solid ${({ theme: { main } }) => main.shade};
  margin: -17.75rem 0 0 -1.2rem;
  z-index: 10;
`
const StyledCard = styled.div`
  background-color: transparent;
  width: 18rem;
  max-width: 21rem;
  position: relative;
  margin: 10px 10px 10px 29.2px;
  &::before {
    content: "";
    background-color: rgb(124, 50, 50);
    width: 18rem;
    max-width: 19rem;
    display: block;
    height: 300px;
    border-radius: ${BORDER_RADIUS};
    box-shadow: 10px 10px 16px rgba(#000000, 0.3),
      -15px -15px 15px rgba(#ffffff, 1);
  }
  &:hover ${StyledCardMeta} {
    box-shadow: 5px 5px 16px rgba(0, 0, 0, 0.4),
      -5px -5px 16px rgba(0, 0, 0, 0.4);
    transition: box-shadow ease-in 0.4s;
  }
`
const StyledCardImage = styled.div`
  background-repeat: no-repeat;
  background-size: 18rem 150px;
  background-clip: content-box;
  width: 100%;
  height: 150px;
  overflow: hidden;
`
const StyledCardContent = styled.div`
  width: 18rem;
  max-width: 21rem;
  color: #e1e1e1;
  border-radius: ${BORDER_RADIUS};
  font-size: ${FONT_SIZE_SM};
  display: inline-block;
  background-color: transparent;
  margin-top: -0.35rem;
  z-index: 1;

  & > .content {
    line-height: 1.5rem;
    height: 5rem;
  }
`

export { StyledCardContent, StyledCardImage, StyledCardMeta }
export default StyledCard
