import React, { ReactElement, ComponentType, useEffect } from 'react'

const defaultTitle = 'Wobbly Matrix'

const changeTitle = (subtitle = ''): void => {
  document.title = [defaultTitle, subtitle].filter(s => s).join(' | ')
}

export function withTitle<P> (Component: ComponentType<P>, title: string): ComponentType<P> {
  const ComponentWithTitle = (props: P): ReactElement => {
    useEffect(() => {
      changeTitle(title)
      return changeTitle
    }, [])
    return <Component { ...props }/>
  }

  return ComponentWithTitle
}
