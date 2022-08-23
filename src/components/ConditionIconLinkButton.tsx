import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface ConditionIconLinkButtonProps {
  icon: ReactElement
  enabled: boolean
  to: string
}

export const ConditionIconLinkButton = ({ icon, enabled, to }: ConditionIconLinkButtonProps): ReactElement => {
  if (!enabled) {
    return (
      <button className="arrow-btn" disabled>
        {icon}
      </button>
    )
  }

  return (
    <Link to={to}>
      <button className="arrow-btn">
        {icon}
      </button>
    </Link>
  )
}
