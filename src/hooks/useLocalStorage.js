import { useState } from 'react'
import { Subject, bufferTime, filter, debounceTime } from 'rxjs'
import { isLocalStorageAvailable } from '@util/isLocalStorageAvailable'

const pendingUpdates$ = new Subject()

const buffered$ = pendingUpdates$.pipe(
  debounceTime(50),
  bufferTime(100),
  filter(x => x.length > 0)
)

const receiveAllChanges = changes => {
  const finalValues = changes.reduce((accum, { key, value }) => ({ ...accum, [key]: value }), {})
  for (const [key, value] of Object.entries(finalValues)) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

buffered$.subscribe(receiveAllChanges)

export function useLocalStorage (key, initialValue) {
  const valueFromStorage = () => {
    console.count('Read localstorage')
    const value = JSON.parse(window.localStorage.getItem(key))
    return value === null ? initialValue : value
  }

  const [value, setValue] = useState(isLocalStorageAvailable() ? valueFromStorage : initialValue)

  if (!isLocalStorageAvailable()) {
    return [value, setValue]
  }

  const setItem = value => {
    setValue(value)
    pendingUpdates$.next({ key, value })
  }

  return [value, setItem]
}
