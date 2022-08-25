import { GridWrapper } from '@components/GridWrapper';
import { ComponentType } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: "Components/GridWrapper",
  component: GridWrapper,
  argTypes: {
    // TODO: What is this? How can I use this the way it's intended?
    handleClick: { action: "logging it in action section" },
  },
  decorators: [
    (Story: ComponentType) => (
      <div style={{ margin: "5rem" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GridWrapper>

const Template: ComponentStory<typeof GridWrapper> = (args) => <GridWrapper {...args} />

export const SquareGrid = Template.bind({});
SquareGrid.args = {
  elasticity: 0.7,
  distWeight: 0.002,
  rows: 5,
  cols: 5,
  frameLimit: false
}

export const RenderPointsGrid = Template.bind({});
RenderPointsGrid.args = {
  elasticity: 0.7,
  distWeight: 0.002,
  rows: 5,
  cols: 5,
  frameLimit: false,
  drawPoints: true
}

export const NonSquareGrid = Template.bind({});
NonSquareGrid.args = {
  elasticity: 0.7,
  distWeight: 0.002,
  rows: 2,
  cols: 6,
  frameLimit: false
}

export const FrameLimitedGrid = Template.bind({});
FrameLimitedGrid.args = {
  elasticity: 0.7,
  distWeight: 0.002,
  rows: 4,
  cols: 4,
  frameLimit: true
}

export const VeryWobblyGrid = Template.bind({});
VeryWobblyGrid.args = {
  elasticity: 0.99,
  distWeight: 0.003,
  rows: 4,
  cols: 4,
  frameLimit: false
}
