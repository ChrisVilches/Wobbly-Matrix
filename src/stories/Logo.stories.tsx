import { Logo } from '@components/Logo';
import { ComponentType } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../styles.css'

export default {
  title: "Components/Logo",
  component: Logo,
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
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const NormalLogo = Template.bind({});
NormalLogo.args = {
  size: 60
}

export const LargeLogo = Template.bind({});
LargeLogo.args = {
  size: 120
}

export const SmallLogo = Template.bind({});
SmallLogo.args = {
  size: 30
}
