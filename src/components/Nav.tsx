import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar } from 'flowbite-react'
import { Logo } from '@components/Logo'

const active = 'active-navbar-link'
const notActive = 'not-active-navbar-link'

export const Nav = (): ReactElement => {
  const location = useLocation()

  const activeIf = (path: string): string => {
    if (path === '') {
      return location.pathname === '/' ? active : notActive
    }

    const strings: string[] = location.pathname.split('/').filter(s => s.length > 0)
    return strings[0] === path ? active : notActive
  }

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <Logo size={60} className="my-4"/>

        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Wobbly Matrix
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link
          to="/"
          className={`${activeIf('')} navbar-link`}
          aria-current="page">
          Home
        </Link>
        <Link
          to="/tutorial"
          className={`${activeIf('tutorial')} navbar-link`}
          aria-current="page">
          Algorithm Explanation
        </Link>
        <a className="not-active-navbar-link navbar-link" href="https://github.com/ChrisVilches/Wobbly-Matrix" target="_blank" rel="noreferrer">
          <div className="inline md:hidden">
            Github
          </div>
          <div className="hidden md:inline">
            <span className="sr-only">GitHub</span>
            <svg viewBox="0 0 16 16" className="w-6 h-6" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
              </path>
            </svg>
          </div>
        </a>
      </Navbar.Collapse>
    </Navbar>
  )
}
