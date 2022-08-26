import React from 'react'
import { Tutorial } from '@routes/Tutorial'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@testing-library/react'

// TODO: These stories generate some warnings in the console.

const routeConfig = (stage: number | undefined): object => {
  if (typeof stage === 'undefined') {
    return {}
  }

  return {
    reactRouter: {
      routePath: '/tutorial/:stage',
      routeParams: {
        stage
      }
    }
  }
}

export default {
  title: 'Routes/Tutorial',
  component: Tutorial,
  parameters: routeConfig(undefined)
} as ComponentMeta<typeof Tutorial>

const Template: ComponentStory<typeof Tutorial> = () => <Tutorial />

const assertButtonsEnabled = (buttons: HTMLElement[], prev: boolean, next: boolean): void => {
  if (prev) {
    expect(buttons[0]).toBeEnabled()
  } else {
    expect(buttons[0]).toBeDisabled()
  }

  if (next) {
    expect(buttons[1]).toBeEnabled()
  } else {
    expect(buttons[1]).toBeDisabled()
  }
}

export const DefaultStep = Template.bind({})

export const Step1 = Template.bind({})
Step1.parameters = routeConfig(1)
Step1.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  assertButtonsEnabled(canvas.getAllByRole('button'), false, true)
}

export const Step2 = Template.bind({})
Step2.parameters = routeConfig(2)
Step2.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  assertButtonsEnabled(canvas.getAllByRole('button'), true, true)
}

export const Step3 = Template.bind({})
Step3.parameters = routeConfig(3)
Step3.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  assertButtonsEnabled(canvas.getAllByRole('button'), true, true)
}

export const Step4 = Template.bind({})
Step4.parameters = routeConfig(4)
Step4.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  assertButtonsEnabled(canvas.getAllByRole('button'), true, false)
}
