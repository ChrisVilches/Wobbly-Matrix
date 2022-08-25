let availableMemo = null

export function isLocalStorageAvailable () {
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
