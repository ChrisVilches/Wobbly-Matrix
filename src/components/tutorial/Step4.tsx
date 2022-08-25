import React, { ReactElement } from 'react'

export const Step4 = (): ReactElement => (
  <>
    <p className="my-4">
      In order to make the grid wobble and not just oscillate, the easiest way is to simply change some numbers involved
      in the movement in a way that&apos;s proportional to the distance from the central point.
    </p>

    <p className="my-4">
      Since the movement of each point is controlled by the use of some constants, you can make the distance affect
      these numbers (by multiplying them). The result is that the points near the center will move differently from the
      points far from it.
    </p>

    <p className="my-4">
      There are multiple ways of achieving this effect.
    </p>
  </>
)
