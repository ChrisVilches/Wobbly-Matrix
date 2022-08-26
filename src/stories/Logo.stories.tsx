import React from 'react'
import { Logo } from '@components/Logo'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Components/Logo',
  component: Logo
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />

export const NormalSize = Template.bind({})
NormalSize.args = {
  size: 60
}

export const Large = Template.bind({})
Large.args = {
  size: 120
}

export const Small = Template.bind({})
Small.args = {
  size: 30
}
