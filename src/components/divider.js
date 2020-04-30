import styled from "styled-components"

const Divider = styled.hr`
  background: ${({ color, theme: { main } }) => color || main.shadeAlt};
  width: ${({ vertical, width }) =>  width || vertical ? `2px` : `100%`};
  height: ${({ vertical, height }) =>  height || vertical ? `100%` : `1px`};
  margin: 0 ${({ vertical }) =>  vertical ? `0.5rem` : 0};
  display: inline-block;
`

export default Divider
