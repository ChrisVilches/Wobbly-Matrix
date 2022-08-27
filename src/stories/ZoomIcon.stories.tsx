import React from 'react'
import { ZoomIcon } from '@components/ZoomIcon'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/ZoomIcon',
  component: ZoomIcon
} as ComponentMeta<typeof ZoomIcon>

const Template: ComponentStory<typeof ZoomIcon> = (args) => <ZoomIcon {...args}/>

export const ZoomedIn = Template.bind({})
ZoomedIn.args = {
  zoomedIn: true
}

export const ZoomedOut = Template.bind({})
ZoomedOut.args = {
  zoomedIn: false
}
