import React from 'react'
import { GridWrapper } from '@components/GridWrapper'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  component: GridWrapper
} as ComponentMeta<typeof GridWrapper>

const Template: ComponentStory<typeof GridWrapper> = (args) => <GridWrapper {...args} />

export const Square = Template.bind({})
Square.args = {
  elasticity: 0.7,
  distWeight: 0.002,
  rows: 5,
  cols: 5
}

export const RenderPoints = Template.bind({})
RenderPoints.args = {
  elasticity: 0.7,
  distWeight: 0.002,
  rows: 5,
  cols: 5,
  drawPoints: true
}

export const NonSquare = Template.bind({})
NonSquare.args = {
  elasticity: 0.7,
  distWeight: 0.002,
  rows: 2,
  cols: 6
}

export const FrameLimited = Template.bind({})
FrameLimited.args = {
  elasticity: 0.7,
  distWeight: 0.002,
  rows: 4,
  cols: 4,
  frameLimit: true
}

export const VeryWobbly = Template.bind({})
VeryWobbly.args = {
  elasticity: 0.99,
  distWeight: 0.003,
  rows: 4,
  cols: 4
}

export const RippleEffect = Template.bind({})
RippleEffect.args = {
  elasticity: 0.90,
  distWeight: 0.002,
  rows: 7,
  cols: 7,
  enableRipple: true
}
