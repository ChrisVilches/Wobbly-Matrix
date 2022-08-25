import { Step1 } from '@components/tutorial/Step1';
import { ComponentType } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: "Components/Step1",
  component: Step1,
  argTypes: {
    handleClick: { action: "logging it in action section" },
  },
  decorators: [
    (Story: ComponentType) => (
      <div style={{ margin: "5rem" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Step1>

const Template: ComponentStory<typeof Step1> = (args) => <Step1 />

export const NormalStep1 = Template.bind({});
