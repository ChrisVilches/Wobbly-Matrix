import React, { ReactElement } from 'react'
import { LightBulbIcon } from '@heroicons/react/24/outline'

export const TipBox = ({ text }: { text: string }): ReactElement => (
  <div className="border-red-700 rounded-xl bg-slate-50 p-10">
    <LightBulbIcon className="h-6 w-6 float-left"/>

    <div className="pl-10">
      <i>{text}</i>
    </div>
  </div>
)
