import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface LogoProps {
  size: number
  className?: string
}

export const Logo = (props: LogoProps): ReactElement => {
  const { size } = props
  const w = size
  const t = w / 8
  const Line1 = styled.div`
    width: ${t}px;
    left: ${w * 0.4 - t}px;
    &:before {
      width: ${w}px;
      height: ${t}px;
      top: ${w * 0.4 - t}px;
      left: -${w * 0.4 - t}px;
    }
  `

  const Line2 = styled.div`
    width: ${t}px;
    left: ${w * 0.6 - t}px;
    &:before {
      width: ${w}px;
      height: ${t}px;
      top: ${w * 0.6}px;
      left: -${w * 0.6}px;
    }
  `

  return (
    <div className={`${props.className ?? ''} logo mx-10 flex rounded-xl`} style={{ width: size, height: size }}>
      <Line1/>
      <Line2/>
    </div>
  )
}
