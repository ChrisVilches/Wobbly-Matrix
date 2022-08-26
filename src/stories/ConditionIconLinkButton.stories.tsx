import React from 'react'
import { ConditionIconLinkButton } from '@components/ConditionIconLinkButton'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

export default {
  title: 'Components/ConditionIconLinkButton',
  component: ConditionIconLinkButton
} as ComponentMeta<typeof ConditionIconLinkButton>

const Template: ComponentStory<typeof ConditionIconLinkButton> = (args) => <ConditionIconLinkButton {...args}/>

export const Enabled = Template.bind({})
Enabled.args = {
  enabled: true,
  to: 'dummy',
  icon: <ChevronLeftIcon className="h-6 w-6"/>
}

export const Disabled = Template.bind({})
Disabled.args = {
  enabled: false,
  to: 'dummy',
  icon: <ChevronLeftIcon className="h-6 w-6"/>
}
