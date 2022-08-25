interface ColorPalette {
  gridPoints: string
  gridSegment: string
}

interface Sizes {
  gridCircle: number
}

export interface GridRendering {
  sizes: Sizes
  colors: ColorPalette
  animateFrameLimitDelay: number
  renderPointsDefault: boolean
}
