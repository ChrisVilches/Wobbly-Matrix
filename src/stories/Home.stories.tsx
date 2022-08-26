import React from 'react'
import { Home } from '@routes/Home'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { fireEvent, within } from '@testing-library/react'
import { expect } from '@storybook/jest'
import gridConfigJson from '@config/default-grid-config.json'
import { GridConfiguration } from '@interfaces/GridConfiguration'
const { cols: defaultCols } = gridConfigJson as GridConfiguration

export default {
  title: 'Routes/Home',
  component: Home
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof Home> = () => <Home/>

const assertResetButtonWorks = async (resetButton: HTMLElement): Promise<void> => {
  const bigValue = '123456'

  localStorage.setItem('matrixSize', JSON.stringify(1))
  localStorage.setItem('elasticity', JSON.stringify(+bigValue))
  localStorage.setItem('distWeight', JSON.stringify(+bigValue))

  expect(localStorage.getItem('elasticity')).toBe(bigValue)
  expect(localStorage.getItem('distWeight')).toBe(bigValue)

  await fireEvent.click(resetButton)

  const waitBufferTime = 500

  setTimeout(() => {
    expect(localStorage.getItem('matrixSize')).toBe(`${defaultCols}`)
    expect(localStorage.getItem('elasticity')).not.toBe(bigValue)
    expect(localStorage.getItem('distWeight')).not.toBe(bigValue)
  }, waitBufferTime)
}

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const resetBtn = canvas.getByRole('button', { name: 'Reset' })
  await assertResetButtonWorks(resetBtn)
}
