import React, { ReactElement } from 'react'
import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/outline'

export const ZoomIcon = ({ zoomedIn }: {zoomedIn: boolean}): ReactElement => (
  zoomedIn
    ? (<MagnifyingGlassMinusIcon className="h-5 w-5"/>)
    : (<MagnifyingGlassPlusIcon className="h-5 w-5"/>)
)
