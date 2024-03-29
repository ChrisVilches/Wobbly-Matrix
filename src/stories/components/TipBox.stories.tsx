import React from 'react'
import { TipBox } from '@components/TipBox'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  component: TipBox
} as ComponentMeta<typeof TipBox>

const Template: ComponentStory<typeof TipBox> = (args) => <TipBox {...args}/>

export const LongText = Template.bind({})
LongText.args = {
  text: `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
  deserunt mollit anim id est laborum.
  `
}

export const NoText = Template.bind({})
