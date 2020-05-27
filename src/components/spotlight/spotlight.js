import styled from "styled-components"
import { LinkButton } from "../button"
import { BREAKPOINTS, L_BREAKPOINTS } from "../theme"

const StyledSpot = styled.div`
  background: ${({ theme: { primaryGradient } }) => primaryGradient};
`

const StyledSpotGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: calc(320px - 2rem);
  grid-row-gap: 30px;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: white;
  @media (min-width: ${BREAKPOINTS.sm}px) {
    grid-template-columns: calc(100vw - 80px);
  }
  @media (min-width: ${BREAKPOINTS.md}px) {
    grid-template-columns: calc(100vw - 150px);
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    grid-template-rows: auto;
    grid-template-columns: repeat(2, 400px);
    grid-column-gap: 100px;
  }
`

const StyledSpotGridChild = styled.div`
  @media (max-width: ${L_BREAKPOINTS.llg}px) {
    &:last-of-type {
      grid-row: 1;
    }
  }
`

const StyledSpotTitle = styled.div`
  font-size: 2rem;
`

const StyledSpotButton = styled(LinkButton)`
  font-size: 1rem;
  color: #ffffff;
  background-color: transparent;
  border-radius: 50px;
  border: 1px solid #ffffff;
  display: inline;
  &:hover {
    color: ${({ theme: { themeColor } }) => themeColor};
    background-color: #ffffff;
  }
`

export {
  StyledSpot,
  StyledSpotTitle,
  StyledSpotGrid,
  StyledSpotGridChild,
  StyledSpotButton,
}
