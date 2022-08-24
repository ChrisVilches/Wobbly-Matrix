import React, { ReactElement } from 'react'

export const NotFound = (): ReactElement => (
  <div className="flex-col justify-center text-center">
    <h1 className="text-xl font-bold">Not Found</h1>
    <p>
      The page does not exist.
    </p>
  </div>
)
