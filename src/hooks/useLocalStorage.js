import { useState } from 'react'

let availableMemo = null

function isLocalStorageAvailable () {
  if (availableMemo !== null) {
    return availableMemo
  }

  const test = 'dummy_key'
  try {
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    availableMemo = true
  } catch (e) {
    availableMemo = false
  }

  return availableMemo
}

const timeOut = {}

const setDelayed = (key, value) => {
  if (key in timeOut) {
    clearTimeout(timeOut[key])
  }
  timeOut[key] = setTimeout(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
    console.count('Set localstorage')
  }, 200)
}

export function useLocalStorage (key, initialValue) {
  let useStateArg = initialValue

  if (isLocalStorageAvailable()) {
    useStateArg = () => {
      console.count('Read localstorage')
      const value = JSON.parse(window.localStorage.getItem(key))
      return value === null ? initialValue : value
    }
  }

  const [value, setValue] = useState(useStateArg)

  if (!isLocalStorageAvailable()) {
    return [value, setValue]
  }

  const setItem = value => {
    setValue(value)
    setDelayed(key, value)
  }

  return [value, setItem]
}
