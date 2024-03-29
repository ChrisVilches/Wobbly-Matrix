import { useState } from 'react'
import { Subject, bufferTime, filter } from 'rxjs'
import { isLocalStorageAvailable } from '@util/isLocalStorageAvailable'

const pendingUpdates$ = new Subject()

const buffered$ = pendingUpdates$.pipe(
  bufferTime(300),
  filter(x => x.length > 0)
)

const receiveAllChanges = changes => {
  const finalValues = changes.reduce((accum, { key, value }) => ({ ...accum, [key]: value }), {})
  for (const [key, value] of Object.entries(finalValues)) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

buffered$.subscribe(receiveAllChanges)

const valueFromStorage = (key) => JSON.parse(window.localStorage.getItem(key))

export function useLocalStorage (key, initialValue) {
  const [value, setValue] = useState(() => isLocalStorageAvailable() ? valueFromStorage(key) ?? initialValue : initialValue)

  if (!isLocalStorageAvailable()) {
    return [value, setValue]
  }

  const setItem = value => {
    setValue(value)
    pendingUpdates$.next({ key, value })
  }

  return [value, setItem]
}
