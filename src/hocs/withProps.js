import React from 'react'

// TODO: Is this robust enough?
export const withProps = (Component, extraProps) => {
  const result = props => <Component {...{ ...extraProps, ...props }}/>
  return result
}
