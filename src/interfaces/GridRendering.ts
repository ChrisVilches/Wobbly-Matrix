interface ColorPalette {
  gridPoints: string
  centerPoint: string
  gridSegment: string
}

interface Sizes {
  gridCircle: number
  cursorCircle: number
}

export interface GridRendering {
  sizes: Sizes
  colors: ColorPalette
}
