import { useRef, useEffect, MutableRefObject } from 'react'

export const useAnimationFrame = (frameLimit: boolean, callback: Function): void => {
  const requestRef: MutableRefObject<number | undefined> = useRef()
  const previousTimeRef: MutableRefObject<number | undefined> = useRef()
  const accumDelta: MutableRefObject<number> = useRef(0)

  const animate = (time: number): void => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current

      let skipFrame = false

      if (frameLimit) {
        accumDelta.current += deltaTime
        if (accumDelta.current < 20) {
          skipFrame = true
        } else {
          accumDelta.current = 0
        }
      }

      if (!skipFrame) {
        callback(deltaTime)
      }
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current!)
  })
}
